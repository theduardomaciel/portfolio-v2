import type { APIRoute } from "astro";
import prisma from "src/lib/prisma";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const slug = params.get("slug");

    if (!slug) {
        return new Response("No slug provided", {
            status: 400,
        });
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: slug,
            },
            include: {
                likedBy: true,
            },
        });

        return new Response(JSON.stringify({ total: post?.likedBy.length }), {
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

async function toggleLike(slug: string, guestId: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
        include: {
            likedBy: true,
        },
    });

    if (!post) {
        return await prisma.post.create({
            data: {
                slug: slug,
                likedBy: {
                    connect: {
                        id: guestId,
                    },
                },
            },
            include: {
                likedBy: true,
            },
        });
    }

    const isLiked = post.likedBy.some(
        (guestWhoLiked) => guestWhoLiked.id === guestId
    );
    console.log("isLiked", isLiked);

    if (isLiked) {
        return await prisma.post.update({
            where: {
                slug: slug,
            },
            data: {
                likedBy: {
                    disconnect: {
                        id: guestId,
                    },
                },
            },
            include: {
                likedBy: true,
            },
        });
    }
        return await prisma.post.update({
            where: {
                slug: slug,
            },
            data: {
                likedBy: {
                    connect: {
                        id: guestId,
                    },
                },
            },
            include: {
                likedBy: true,
            },
        });
}

export const PATCH: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const { guestId } = body;
    const slug = params.slug;

    if (!slug) {
        return new Response("No slug provided", {
            status: 400,
        });
    }

    try {
        const newOrUpdatedPost = await toggleLike(slug, guestId);

        return new Response(
            JSON.stringify({
                total: newOrUpdatedPost.likedBy.length,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 500,
        });
    }
};
