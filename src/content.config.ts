import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const conversations = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/conversations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    model: z.enum(['opus', 'sonnet', 'haiku', 'mixed']).default('opus'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heat: z.number().int().min(1).max(5).default(3),
  }),
});

export const collections = { conversations };
