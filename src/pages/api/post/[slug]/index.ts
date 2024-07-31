import type { APIRoute } from "astro";
import prisma from "src/lib/prisma";

export async function getPostStatsBySlug(slug: string) {
    try {
        const post = await prisma.post.upsert({
            where: {
                slug: slug,
            },
            create: {
                slug: slug,
                views: 1,
            },
            update: {
                views: {
                    increment: 1,
                },
            },
            include: {
                likedBy: true,
            },
        });

        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const GET: APIRoute = async ({ params, request }) => {
    const slug = params.slug;

    if (!slug) {
        return new Response("No slug provided", {
            status: 400,
        });
    }

    try {
        const post = getPostStatsBySlug(slug);

        return new Response(JSON.stringify(post), {
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
