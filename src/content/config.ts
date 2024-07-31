import { defineCollection, z } from "astro:content";

// Original article: https://www.kozhuhds.com/blog/how-to-build-a-static-lightweight-mdx-blog-with-astro-step-by-step-guide

const postsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		// With Zod we can define type-safe frontmatter to our mdx files
		// Astro will generate types definitions for our project so we can use them in templates
		// It will also check every newly created frontmatter in the content/blog directory
		z.object({
			title: z.string(),
			tags: z.array(z.string()),
			cover: image().optional(),
			publishedAt: z.coerce.date(),
		}),
});

// This key should match your collection directory name in "src/content"
export const collections = {
	blog: postsCollection,
};
