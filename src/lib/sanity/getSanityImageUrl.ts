import { useSanityClient, createImageBuilder } from "astro-sanity";

export const imageBuilder = createImageBuilder(useSanityClient());

export default function getSanityImageURL(source: unknown) {
	return imageBuilder.image(source).auto("format").fit("max");
}
