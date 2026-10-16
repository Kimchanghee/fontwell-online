import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    question: z.string(),
    answer: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    data_asof: z.string(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    order: z.number().default(50),
  }),
});

export const collections = { guides };
