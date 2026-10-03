// Ouvre les liens externes dans un nouvel onglet et charge les images en différé.
import { visit } from 'unist-util-visit';

export default function rehypeExternal() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && /^https?:\/\//.test(node.properties?.href || '') && !/^https?:\/\/(www\.)?messor\.fr/.test(node.properties.href)) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener';
      }
      if (node.tagName === 'img') {
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
        // Illustrations générées (1200 × 675) : dimensions connues, pas de saut de mise en page
        if (String(node.properties.src || '').includes('/images/blog/')) Object.assign(node.properties, { width: 1200, height: 675 });
      }
    });
  };
}
