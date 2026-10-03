// Ouvre les liens externes dans un nouvel onglet et charge les images en différé.
import { visit } from 'unist-util-visit';

export default function rehypeExternal() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && /^https?:\/\//.test(node.properties?.href || '') && !/^https?:\/\/(www\.)?messor\.fr/.test(node.properties.href)) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener';
      }
      if (node.tagName === 'img') node.properties.loading = 'lazy';
    });
  };
}
