// Configuration du site statique Messor.
// SITE_BASE permet de publier une préproduction dans un sous-dossier (ex. /nouveau-site).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import rehypeBase from './plugins/rehype-base.mjs';
import rehypeSections from './plugins/rehype-sections.mjs';
import rehypeExternal from './plugins/rehype-external.mjs';

const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site: 'https://messor.fr',
  base,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({
    i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } },
  })],
  markdown: {
    rehypePlugins: [rehypeRaw, rehypeSections, rehypeExternal, [rehypeBase, { base }]],
  },
});
