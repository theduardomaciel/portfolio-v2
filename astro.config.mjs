import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	site: "https://theduardomaciel.vercel.app/",
	integrations: [react(), mdx()],
	prefetch: true,
	output: "server",
	adapter: vercel({
		excludeFiles: [".prisma/client/index-browser"],
		functionPerRoute: false,
	}),
	vite: {
		plugins: [
			svgr({
				include: "**/*.svg?react",
			}),
		],
	},
});
