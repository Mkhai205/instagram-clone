import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function fetchPosts() {
    unstable_noStore(); // This function will not be cached

    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                likes: {
                    include: {
                        user: true,
                    },
                },
                savedBy: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
    }
}

export async function fetchPostById(id: string) {
    unstable_noStore(); // This function will not be cached

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                likes: {
                    include: {
                        user: true,
                    },
                },
                savedBy: true,
                user: true,
            },
        });

        return post;
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw new Error("Failed to fetch post");
    }
}

export async function fetchPostByUsername(username: string, postId?: string) {
    unstable_noStore();

    try {
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    username,
                },
                NOT: {
                    id: postId,
                },
            },
            include: {
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                likes: {
                    include: {
                        user: true,
                    },
                },
                savedBy: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    } catch (error) {
        console.error("Error fetching posts by username:", error);
        throw new Error("Failed to fetch posts by username");
    }
}
