import prisma from "src/lib/prisma";

import type { APIRoute } from "astro";

export function fetchProjectsStatus() {
	try {
		return prisma.projectStatus.findMany({
			include: {
				incidents: {
					where: {
						resolved: false,
					},
					include: {
						logs: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error getting status");
	}
}

export const GET: APIRoute = async ({ request }) => {
	try {
		const status = await fetchProjectsStatus();

		return new Response(JSON.stringify(status), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.log(error);
		return new Response("Error", {
			status: 500,
		});
	}
};
