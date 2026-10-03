// Préfixe les liens internes avec le dossier de publication (ex. /nouveau-site en préproduction).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (BASE && (path === BASE || path.startsWith(BASE + '/'))) return path;
  return BASE + path;
}

// Même chose pour un fragment HTML (liens et images en chemin absolu).
export function prefixHtml(html: string): string {
  return html.replace(/(href|src)="(\/[^/"][^"]*|\/)"/g, (_, attr, p) => `${attr}="${url(p)}"`);
}
