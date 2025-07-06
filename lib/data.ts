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
