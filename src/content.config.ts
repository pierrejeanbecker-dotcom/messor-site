import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ href: z.string(), label: z.string().optional().default('') });

const common = {
  title: z.string(),
  seoTitle: z.string().optional(),
  description: z.string().optional(),
  lang: z.enum(['fr', 'en']),
  permalink: z.string(),           // adresse de la page, identique à l'ancien site
  alternate: z.string().optional(), // même page dans l'autre langue
  draft: z.boolean().optional(),
};

// Pages : src/content/pages/**/*.md
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    ...common,
    heroTitle: z.string().optional(),
    heroLead: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    prev: link.optional(),
    next: link.optional(),
    latestPosts: z.boolean().optional(),
    video: z.boolean().optional(), // vidéo de présentation sous l'en-tête (src/components/MessorVideo.astro)
    cta: link.optional(), // bouton principal de l'en-tête (par défaut : prise de RDV)
    kind: z.enum(['offer', 'expertise', 'page']).optional(), // mise en page en sections (offres, expertise, autres)
  }),
});

// Articles de blog : src/content/posts/<catégorie>/<article>.md
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    ...common,
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Messor'),
    category: z.string(),
    categories: z.array(z.string()).default([]),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { pages, posts };
