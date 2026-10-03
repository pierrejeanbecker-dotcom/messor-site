// Génère 2 illustrations par article de blog et les insère dans le texte :
//   1. « Les points clés » : les grandes parties de l'article (avant la première partie)
//   2. « Chiffre clé » (une statistique de l'article) ou, à défaut, « Le conseil Messor »
//      (une phrase en gras de l'article), au milieu du texte.
// Les images sont uniques, aux couleurs Messor, avec un texte alternatif descriptif (SEO).
//
// Usage : node scripts/blog-illustrations.mjs [motif]   (relançable : remplace les images existantes)
// Nécessite Chromium (Playwright) : PLAYWRIGHT_BROWSERS_PATH ou `npx playwright install chromium`.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const POSTS = join(ROOT, 'src/content/posts');
const OUT = join(ROOT, 'public/images/blog');
// Polices et image intégrées en data URI (une page générée en mémoire ne peut pas lire les fichiers locaux)
const dataUri = (file, mime) => `data:${mime};base64,${readFileSync(join(ROOT, file)).toString('base64')}`;
const FONT = (name) => dataUri(`public/fonts/${name}.woff2`, 'font/woff2');
const BRUEGEL = `data:image/jpeg;base64,${(await sharp(join(ROOT, 'public/images/bruegel-les-moissonneurs-2200.webp')).resize(1400).jpeg({ quality: 70 }).toBuffer()).toString('base64')}`;
const filter = process.argv[2] || '';
// Choix relus à la main (prioritaires) : scripts/blog-illustrations.json
const PICKS = JSON.parse(readFileSync(join(ROOT, 'scripts/blog-illustrations.json'), 'utf8'));

const L = {
  fr: { points: 'Les points clés', figure: 'Chiffre clé', tip: 'Le conseil Messor',
        altPoints: (t, l) => `Infographie : les ${l.length} points clés de l’article « ${t} »`,
        altFigure: (s) => `Chiffre clé : ${s}`, altTip: (s) => `Le conseil Messor : ${s}` },
  en: { points: 'Key takeaways', figure: 'Key figure', tip: 'Messor tip',
        altPoints: (t, l) => `Infographic: the ${l.length} key takeaways from “${t}”`,
        altFigure: (s) => `Key figure: ${s}`, altTip: (s) => `Messor tip: ${s}` },
};

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.md') && p.includes(filter)) files.push(p);
  }
})(POSTS);

// ── Lecture du Markdown ───────────────────────────────────────────────
const plain = (s) => s
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, '')
  .replace(/[*_`]+/g, '')
  .replace(/\s+/g, ' ')
  .trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SKIP_HEAD = /(conclusion|faq|frequently|questions fréquentes|foire aux|sources?$|en résumé|summary)/i;
// Titres écrits « En Majuscule À Chaque Mot » -> « En majuscule à chaque mot » (noms propres conservés)
const KEEP = /^(Messor|Google|Ads|LinkedIn|Sales|Navigator|Power|Automate|Teams|Allemagne|Germany|France|Europe|Notion|Make|Airtable|HubSpot|Salesforce)$/;
function sentenceCase(h) {
  const words = h.split(' ').filter((w) => /\p{L}/u.test(w));
  const core = (w) => w.replace(/^[\p{L}]{1,3}[’']/u, '').replace(/[^\p{L}-]/gu, '');
  const long = words.slice(1).map(core).filter((w) => w.length >= 4 && !KEEP.test(w) && !/\p{Lu}.*\p{Lu}/u.test(w));
  const caps = long.filter((w) => /^\p{Lu}\p{Ll}/u.test(w)).length;
  if (!long.length || caps / long.length < 0.5) return h;
  const lowerPart = (part) => (KEEP.test(part.replace(/[^\p{L}]/gu, '')) || /\p{Lu}.*\p{Lu}/u.test(part) ? part : part.replace(/^(\P{L}*)(\p{Lu})/u, (m, a, c) => a + c.toLowerCase()));
  return h.split(' ').map((w, i) => {
    const m = w.match(/^([\p{L}]{1,3}[’'])(.*)$/u);
    const [pre, rest] = m ? [m[1], m[2]] : ['', w];
    const fixed = rest.split('-').map((p, j) => (i === 0 && j === 0 && !pre ? p : lowerPart(p))).join('-');
    return (i === 0 && pre ? pre.charAt(0).toUpperCase() + pre.slice(1) : pre) + fixed;
  }).join(' ');
}
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s);

function parse(file) {
  const raw = readFileSync(file, 'utf8');
  const end = raw.indexOf('\n---', 3);
  const fm = raw.slice(0, end + 4);
  const body = raw.slice(end + 4);
  const get = (k) => {
    const m = fm.match(new RegExp(`^${k}: (.*)$`, 'm'));
    if (!m) return '';
    try { return JSON.parse(m[1]); } catch { return m[1]; }
  };
  return { raw, fm, body, title: get('title'), lang: get('lang') || 'fr', image: get('image') };
}

function headings(body, lang = 'fr') {
  const pick = (level) => body.split('\n')
    .filter((l) => l.startsWith('#'.repeat(level) + ' '))
    .map((l) => plain(l.slice(level + 1)).replace(/^\d+\s*[.)\-–:]\s*/, ''));
  const cut = (list) => {
    const i = list.findIndex((h) => SKIP_HEAD.test(h));
    return (i >= 0 ? list.slice(0, i) : list).filter((h) => h && !SKIP_HEAD.test(h));
  };
  let list = cut(pick(2));
  if (list.length < 3) list = cut(pick(3)).length >= 3 ? cut(pick(3)) : list.length ? list : cut(pick(3));
  return list.slice(0, 5).map((h) => clip(lang === 'fr' ? sentenceCase(h) : h, 72));
}

function mainText(body) {
  // Texte avant la FAQ / conclusion, sans titres
  const lines = body.split('\n');
  const stop = lines.findIndex((l) => /^#{2,3} /.test(l) && SKIP_HEAD.test(l));
  return (stop > 0 ? lines.slice(0, stop) : lines).filter((l) => !l.startsWith('#')).join('\n');
}

// Retire les connecteurs de début de phrase (« Par exemple, », « En effet, »…)
const tidy = (s) => {
  const t = s.replace(/^(par exemple|en effet|ainsi|de plus|en outre|en fait|for example|for instance|indeed|moreover|in fact)\s*,\s*/i, '');
  return t.charAt(0).toUpperCase() + t.slice(1);
};

function figure(body) {
  const sentences = plain(mainText(body).replace(/\n+/g, ' . '))
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/^[.\s\-–•]+/, '').trim())
    .filter((s) => s.length >= 45 && s.length <= 190 && !/\[|source\]|\?$/i.test(s));
  const NUM = /(\+?\d+(?:[.,]\d+)?\s?%|\d+(?:[.,]\d+)?\s?(?:fois|times|x)\b|\d+\s?(?:k€|M€|€))/i;
  for (const s of sentences) {
    const m = s.match(NUM);
    if (m) return { kind: 'figure', big: m[1].replace(/\s/g, '\u202f'), text: tidy(s) };
  }
  return null;
}

function tip(body) {
  const bolds = [...mainText(body).matchAll(/\*\*([^*]{40,170})\*\*/g)].map((m) => plain(m[1]))
    .filter((s) => !/\[|:$/.test(s) && s.split(' ').length >= 7);
  if (bolds.length) return { kind: 'tip', text: tidy(bolds[Math.floor(bolds.length / 2)]) };
  const sentences = plain(mainText(body).replace(/\n+/g, ' . ')).split(/(?<=[.!?])\s+/)
    .filter((s) => s.length >= 60 && s.length <= 170 && !/\[/.test(s));
  return sentences.length ? { kind: 'tip', text: tidy(sentences[Math.floor(sentences.length / 3)]) } : null;
}

// ── Gabarits (1200 × 675) ─────────────────────────────────────────────
const CSS = `
@font-face { font-family: 'DM Sans'; font-weight: 300 700; src: url('${FONT('dm-sans-latin')}') format('woff2'); }
@font-face { font-family: 'DM Serif Display'; src: url('${FONT('dm-serif-display-latin')}') format('woff2'); }
@font-face { font-family: 'DM Serif Display'; font-style: italic; src: url('${FONT('dm-serif-display-italic-latin')}') format('woff2'); }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 675px; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
.card { width: 1200px; height: 675px; position: relative; overflow: hidden; padding: 64px 72px; display: flex; flex-direction: column; }
.eyebrow { font-size: 17px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; display: flex; align-items: center; gap: 14px; }
.eyebrow::before { content: ''; width: 36px; height: 2px; background: currentColor; }
.brand { position: absolute; left: 72px; bottom: 48px; font-weight: 700; font-size: 20px; letter-spacing: 0.04em; }
.brand span { color: #13C995; }
.brand small { font-weight: 400; letter-spacing: 0.02em; margin-left: 14px; font-size: 16px; opacity: 0.7; }
/* Points clés : fond sombre */
.dark { background: #0b0e14; color: white; }
.dark::before { content: ''; position: absolute; inset: 0; background: url('${BRUEGEL}') 30% 85% / cover; opacity: 0.16; }
.dark::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, #0b0e14 0%, rgba(11,14,20,0.92) 45%, rgba(11,14,20,0.82) 100%); }
.dark > *:not(.brand) { position: relative; z-index: 1; }
.dark .brand { z-index: 1; }
.dark .eyebrow { color: #13C995; }
.grid { display: grid; grid-template-columns: 1fr 1.25fr; gap: 56px; flex: 1; align-items: center; margin-top: 8px; }
.title { font-family: 'DM Serif Display', serif; font-size: var(--ts); line-height: 1.08; letter-spacing: -0.015em; }
ol { list-style: none; counter-reset: k; }
li { counter-increment: k; display: flex; gap: 22px; align-items: baseline; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.14); font-size: var(--ls); line-height: 1.3; color: #e6e8ec; }
li:first-child { border-top: 0; }
li::before { content: counter(k, decimal-leading-zero); font-family: 'DM Serif Display', serif; color: #13C995; font-size: calc(var(--ls) * 1.25); min-width: 34px; }
/* Chiffre / conseil : fond clair */
.light { background: #f7f4ef; color: #14161b; }
.light::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: #13C995; }
.light .eyebrow { color: #137656; }
.fig { display: flex; flex-direction: column; justify-content: center; flex: 1; gap: 18px; position: relative; z-index: 1; }
.big { font-family: 'DM Serif Display', serif; color: #137656; font-size: var(--bs); line-height: 0.95; letter-spacing: -0.03em; }
.sentence { font-family: 'DM Serif Display', serif; font-size: var(--ss); line-height: 1.22; max-width: 1000px; color: #14161b; }
.quote { font-family: 'DM Serif Display', serif; color: #13C995; font-size: 180px; line-height: 0.6; height: 70px; }
.tipline { font-family: 'DM Serif Display', serif; font-style: italic; font-size: var(--ss); line-height: 1.25; max-width: 1020px; }
.light .brand { color: #14161b; }
`;

const page = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${inner}</body></html>`;

function pointsHtml(post, items) {
  const t = L[post.lang];
  const ts = post.title.length > 90 ? 38 : post.title.length > 60 ? 44 : 52;
  const ls = items.length >= 5 ? 21 : 24;
  return page(`<div class="card dark" style="--ts:${ts}px;--ls:${ls}px">
    <div class="eyebrow">${t.points}</div>
    <div class="grid">
      <div class="title">${esc(post.lang === "fr" ? sentenceCase(post.title) : post.title)}</div>
      <ol>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>
    </div>
    <div class="brand">M<span>€</span>SSOR<small>messor.fr</small></div>
  </div>`);
}

function secondHtml(post, s) {
  const t = L[post.lang];
  const ss = s.text.length > 150 ? 34 : s.text.length > 100 ? 40 : 46;
  if (s.kind === 'figure') {
    const bs = s.big.length > 6 ? 150 : 190;
    return page(`<div class="card light" style="--bs:${bs}px;--ss:${ss - 4}px">
      <div class="eyebrow">${t.figure}</div>
      <div class="fig"><div class="big">${esc(s.big)}</div><div class="sentence">${esc(s.text)}</div></div>
      <div class="brand">M<span>€</span>SSOR<small>messor.fr</small></div>
    </div>`);
  }
  return page(`<div class="card light" style="--ss:${ss}px">
    <div class="eyebrow">${t.tip}</div>
    <div class="fig"><div class="quote">“</div><div class="tipline">${esc(s.text)}</div></div>
    <div class="brand">M<span>€</span>SSOR<small>messor.fr</small></div>
  </div>`);
}

// ── Insertion dans le Markdown ────────────────────────────────────────
function insert(body, img1, img2) {
  const lines = body.split('\n').filter((l) => !l.includes('/images/blog/'));
  const text = lines.join('\n').replace(/\n{3,}/g, '\n\n');
  const ls = text.split('\n');
  const h2 = ls.map((l, i) => (/^## /.test(l) ? i : -1)).filter((i) => i >= 0);
  const heads = h2.length >= 2 ? h2 : ls.map((l, i) => (/^### /.test(l) ? i : -1)).filter((i) => i >= 0);
  const paraAfter = (i) => { let j = i; while (j < ls.length && ls[j].trim() !== '') j++; return j; };

  // Image 1 : avant la première partie (après l'introduction), sinon après le 1er paragraphe
  const firstContent = ls.findIndex((l) => l.trim() && !l.startsWith('#'));
  let p1 = heads.length && heads[0] > firstContent ? heads[0] : paraAfter(Math.max(firstContent, 0));
  // Image 2 : avant la partie la plus proche du milieu (hors 1re, conclusion et FAQ)
  const usable = heads.filter((i) => i > p1 + 2 && !SKIP_HEAD.test(ls[i]));
  const mid = ls.length / 2;
  let p2 = usable.length ? usable.reduce((a, b) => (Math.abs(b - mid) < Math.abs(a - mid) ? b : a)) : -1;
  if (p2 < 0) {
    let j = Math.max(Math.floor(mid), p1 + 2);
    while (j < ls.length && !(ls[j].trim() === '' && ls[j - 1]?.trim() && !ls[j - 1].startsWith('#') && !ls[j - 1].startsWith('-'))) j++;
    p2 = Math.min(j, ls.length);
  }
  const block = (img) => [`![${img.alt.replace(/[[\]]/g, '')}](${img.src})`, ''];
  const out = [...ls];
  out.splice(p2, 0, ...block(img2), ...(ls[p2 - 1]?.trim() ? [''] : []));
  out.splice(p1, 0, ...(ls[p1 - 1]?.trim() ? [''] : []), ...block(img1));
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

// ── Principal ─────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 675 } });
const render = async (html, file) => {
  await tab.setContent(html, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  const png = await tab.screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 82 }).toFile(file);
};

let n = 0;
const report = [];
for (const file of files) {
  const post = parse(file);
  const slug = basename(file, '.md');
  const pick = PICKS[slug] || {};
  const items = pick.points || headings(post.body, post.lang);
  const second = pick.text ? { kind: pick.kind, big: (pick.big || '').replace(/ /g, '\u202f'), text: pick.text } : figure(post.body) || tip(post.body);
  if (items.length < 2 || !second) { report.push(`⚠ ${slug} : contenu insuffisant, ignoré`); continue; }
  const t = L[post.lang];
  const img1 = { src: `/images/blog/${slug}-points-cles.webp`, alt: t.altPoints(post.title, items) };
  const name2 = second.kind === 'figure' ? 'chiffre-cle' : 'conseil';
  const img2 = { src: `/images/blog/${slug}-${name2}.webp`, alt: second.kind === 'figure' ? t.altFigure(second.text) : t.altTip(second.text) };
  await render(pointsHtml(post, items), join(OUT, `${slug}-points-cles.webp`));
  await render(secondHtml(post, second), join(OUT, `${slug}-${name2}.webp`));
  let fm = post.fm;
  // Article sans image de couverture : on utilise « Les points clés »
  if (!post.image) fm = fm.replace(/\n---$/, `\nimage: "${img1.src}"\n---`);
  writeFileSync(file, fm + insert(post.body, img1, img2));
  n++;
  report.push(`${pick.text ? '✓' : '·'} ${slug} : ${items.length} points clés + ${second.kind === 'figure' ? `chiffre « ${second.big} »` : 'conseil'}${pick.text ? '' : ' (détection automatique, à relire)'}`);
}
await browser.close();
console.log(report.join('\n'));
console.log(`\n${n} articles illustrés (${n * 2} images dans public/images/blog/).`);
