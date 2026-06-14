import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				category: z.string().optional(),
				tags: z.array(z.string()).optional(),
				source: z.string().url().optional(),
				related: z.array(z.string()).optional(),
			}),
		}),
	}),
};
