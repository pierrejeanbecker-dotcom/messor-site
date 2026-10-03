// Vérifie que chaque lien interne du site construit (dist/) pointe vers une page ou un fichier existant.
// Usage : npm run build && npm run check-links
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BASE = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const redirects = existsSync('public/.htaccess') ? readFileSync('public/.htaccess', 'utf8') : '';
const redirected = new Set([...redirects.matchAll(/^RewriteRule \^(.+?)\/\?\$ /gm)].map((m) => '/' + m[1].replace(/\\/g, '')));

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(DIST);

const exists = (path) => {
  if (BASE) {
    if (path !== BASE && !path.startsWith(BASE + '/')) return false;
    path = path.slice(BASE.length) || '/';
  }
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]).replace(/\/$/, '') || '/';
  if (clean === '/') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean)) || existsSync(join(DIST, clean + '.html')) || existsSync(join(DIST, clean, 'index.html'));
};

const broken = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const [, attr, link] of html.matchAll(/\s(href|src)="(\/[^"/][^"]*|\/)"/g)) {
    if (link.startsWith('//') || exists(link)) continue;
    const key = link.split('#')[0];
    if (redirected.has(key.slice(BASE.length).replace(/\/$/, ''))) continue;
    if (!broken.has(key)) broken.set(key, new Set());
    broken.get(key).add(f.replace(DIST, ''));
  }
}

if (broken.size === 0) {
  console.log(`✓ ${files.length} pages vérifiées, aucun lien interne cassé.`);
} else {
  for (const [link, pages] of broken) console.log(`✗ ${link}  (dans ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? '…' : ''})`);
  console.log(`\n${broken.size} lien(s) cassé(s).`);
  process.exitCode = 1;
}
