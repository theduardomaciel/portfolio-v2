import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const getTitleFromSlug = (slug: string) => {
	return slug.split("/")[0];
};

export const getBlogPosts = async (lang?: string, category?: string) => {
	let blogPosts = await getCollection("blog");

	blogPosts = blogPosts.filter((post) => post.slug.endsWith(lang ?? "en"));

	if (category) {
		return blogPosts.filter((post) => post.data.tags.includes(category));
	}

	return blogPosts;
};

export const getBlogTags = (blogPosts: CollectionEntry<"blog">[]) => {
	const tags = blogPosts.reduce<string[]>((acc, curr) => {
		for (const tag of curr.data.tags) {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}
		}

		return acc;
	}, [] as string[]);

	return tags;
};
