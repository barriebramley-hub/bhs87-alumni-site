import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './lib/posts';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(CATEGORIES),
    excerpt: z.string(),
    author: z.string().default('Tan Lawensky'),
    hero: z.string().optional(),
    podcastUrl: z.string().url().optional(),
    podcastHost: z.string().optional(),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
    sections: z
      .array(z.object({ number: z.string(), title: z.string(), body: z.string() }))
      .optional(),
  }),
});

export const collections = { blog, pages };
