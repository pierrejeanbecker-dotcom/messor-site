// Pages de service (frontmatter « kind ») : découpe le contenu en sections à chaque titre h2
// et choisit une mise en page selon le titre :
//   FAQ…                      -> accordéon
//   Méthodologie, missions…   -> étapes numérotées (un h3 = une étape)
//   Nos atouts, pourquoi…     -> cartes
//   autre                     -> chapitre numéroté
import { toString } from 'hast-util-to-string';

const KINDS = [
  ['faq', /^(faq|foire aux questions|frequently asked|questions fréquentes)/i],
  ['steps', /(méthodologie|methodology|exemples? de missions|examples? of (our )?missions|notre méthode|our method|comment messor pilote|how messor|notre approche|our approach)/i],
  ['benefits', /(atouts|strengths|assets|pourquoi faire confiance|why trust|why choose|avantages|advantages)/i],
];

const el = (tagName, className, children = [], props = {}) => ({
  type: 'element', tagName, properties: { ...(className ? { className: className.split(' ') } : {}), ...props }, children,
});
const isBlank = (n) => n.type === 'text' && !n.value.trim();
const pad = (i) => String(i).padStart(2, '0');

function steps(nodes) {
  const intro = [];
  const items = [];
  for (const n of nodes) {
    if (n.type === 'element' && n.tagName === 'h3') items.push([n]);
    else if (items.length) items[items.length - 1].push(n);
    else intro.push(n);
  }
  if (items.length < 2) return nodes;
  return [
    ...intro,
    el('ol', `steps steps-${items.length}`, items.map((c, i) => el('li', 'step', [el('span', 'step-n', [{ type: 'text', value: pad(i + 1) }]), el('div', 'step-c', c)]))),
  ];
}

export default function rehypeSections() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter || {};
    if (!fm.kind) return;

    const groups = [];
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') groups.push({ heading: node, nodes: [] });
      else if (groups.length) groups[groups.length - 1].nodes.push(node);
      else groups.push({ heading: null, nodes: [node] });
    }

    let chapter = 0;
    tree.children = groups
      .filter((g) => g.heading || g.nodes.some((n) => !isBlank(n)))
      .map((g) => {
        const title = g.heading ? toString(g.heading) : '';
        let kind = (KINDS.find(([, re]) => re.test(title)) || ['text'])[0];
        // Section composée surtout de blocs dépliables (ex. offres d'emploi) : style accordéon
        if (kind === 'text' && g.nodes.filter((n) => n.tagName === 'details').length >= 2) kind = 'accordion';
        if (kind !== 'faq') chapter++;
        const head = g.heading
          ? [el('header', 'blk-head', [
              el('span', 'blk-num', [{ type: 'text', value: kind === 'faq' ? 'FAQ' : pad(chapter) }]),
              g.heading,
            ])]
          : [];
        const body = kind === 'steps' ? steps(g.nodes) : g.nodes;
        const long = title.length > 70 ? ' blk-long' : '';
        return el('section', `blk blk-${kind}${g.heading ? '' : ' blk-nohead'}${long}`, [
          el('div', 'blk-inner', [...head, el('div', 'blk-body', body)]),
        ]);
      });
  };
}
