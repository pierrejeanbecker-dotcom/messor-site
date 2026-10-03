// Écrit dist/.htaccess pour l'hébergement Apache d'OVH :
//  - adresses sans « .html » (identiques à l'ancien WordPress)
//  - redirections 301 des anciennes adresses (src/data/redirects.json)
//  - page 404, HTTPS, cache et compression
import { readFileSync, writeFileSync } from 'node:fs';

const base = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');
const prod = base === '/';
const redirects = JSON.parse(readFileSync('src/data/redirects.json', 'utf8'));
const esc = (s) => s.replace(/^\//, '').replace(/[.+?()[\]{}^$|\\]/g, '\\$&');

const lines = [
  '# Généré automatiquement par scripts/build-htaccess.mjs — ne pas modifier à la main.',
  'Options -Indexes',
  'DirectoryIndex index.html',
  'DirectorySlash Off',
  `ErrorDocument 404 ${base}404.html`,
  '',
  'RewriteEngine On',
  `RewriteBase ${base}`,
  '',
];

if (!prod) {
  lines.push(
    '# Dossier de préproduction appelé sans barre finale',
    `<If "%{REQUEST_URI} == '${base.replace(/\/$/, '')}'">`,
    '  DirectorySlash On',
    '</If>',
    '',
  );
}

if (prod) {
  lines.push(
    '# HTTPS et domaine sans « www »',
    'RewriteCond %{SERVER_PORT} ^80$ [OR]', // méthode recommandée par OVH (HTTPS terminé en amont)
    'RewriteCond %{HTTP_HOST} ^www\\. [NC]',
    'RewriteRule ^(.*)$ https://messor.fr/$1 [R=301,L]',
    '',
  );
}

lines.push(
  '# Anciennes adresses WordPress',
  'RewriteRule ^wp-content/uploads/(.*)$ medias/$1 [R=301,L]',
  ...Object.entries(redirects).map(
    ([from, to]) => `RewriteRule ^${esc(from)}/?$ ${base}${to.replace(/^\//, '')} [R=301,L,NC]`,
  ),
  '',
  '# /index.html -> /',
  'RewriteCond %{THE_REQUEST} \\s/+(.*/)?index\\.html[\\s?] [NC]',
  'RewriteRule ^ /%1 [R=301,L,NE]',
  '',
  '# Adresses sans « .html » : /page.html -> /page',
  'RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]',
  'RewriteRule ^ /%1 [R=301,L,NE]',
  '',
  '# Barre oblique finale superflue : /page/ -> /page',
  'RewriteCond %{REQUEST_URI} !^' + base.replace(/\/$/, '') + '/?$',
  'RewriteRule ^(.+)/$ ' + base + '$1 [R=301,L]',
  '',
  '# Accueil (y compris le dossier sans barre finale)',
  'RewriteRule ^$ index.html [L]',
  '',
  '# /page -> fichier page.html',
  'RewriteCond %{REQUEST_FILENAME}.html -f',
  'RewriteRule ^(.+)$ $1.html [L]',
  '',
  '<IfModule mod_deflate.c>',
  '  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml text/xml',
  '</IfModule>',
  '<IfModule mod_expires.c>',
  '  ExpiresActive On',
  '  ExpiresByType text/html "access plus 0 seconds"',
  '  ExpiresByType text/css "access plus 1 year"',
  '  ExpiresByType application/javascript "access plus 1 year"',
  '  ExpiresByType font/woff2 "access plus 1 year"',
  '  ExpiresByType image/webp "access plus 1 month"',
  '  ExpiresByType image/png "access plus 1 month"',
  '  ExpiresByType image/jpeg "access plus 1 month"',
  '</IfModule>',
  '',
);

if (!prod) {
  lines.push('# Préproduction : ne pas indexer', '<IfModule mod_headers.c>', '  Header set X-Robots-Tag "noindex, nofollow"', '</IfModule>', '');
}

writeFileSync('dist/.htaccess', lines.join('\n'));
if (!prod) writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log(`.htaccess écrit (base ${base}, ${Object.keys(redirects).length} redirections)`);
