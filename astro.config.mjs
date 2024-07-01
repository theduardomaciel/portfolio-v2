import { defineConfig } from "astro/config";

import svgr from "vite-plugin-svgr";
import sanity from "astro-sanity";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

export default defineConfig({
	site: "https://theduardomaciel.vercel.app/",
	integrations: [
		react(),
		sanity({
			projectId: "0jclcbcz",
			dataset: "production",
			apiVersion: "v2023-01-01",
			useCdn: true,
		}),
	],
	prefetch: true,
	output: "server",
	adapter: vercel({
		excludeFiles: [".prisma/client/index-browser"],
		functionPerRoute: false,
	}),
	vite: {
		plugins: [svgr()],
	},
});
