// Ajoute le dossier de publication (base) devant les liens internes du contenu Markdown.
import { visit } from 'unist-util-visit';

export default function rehypeBase({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    if (!prefix) return;
    visit(tree, 'element', (node) => {
      for (const attr of ['href', 'src']) {
        const v = node.properties?.[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) {
          node.properties[attr] = prefix + v;
        }
      }
    });
  };
}
