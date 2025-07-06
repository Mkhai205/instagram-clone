"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/utils";
import { CreatePost, DeletePost, LikeSchema } from "./schemas";

export async function createPost(values: z.infer<typeof CreatePost>) {
    const validateFields = CreatePost.safeParse(values);

    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, message: "Validation failed" };
    }

    const { caption, fileUrl } = validateFields.data;

    try {
        const userId = await getUserId();

        await prisma.post.create({
            data: {
                caption,
                fileUrl,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        revalidatePath("/dashboard");
        redirect("/dashboard");
        return { statusbar: "200", message: "Post created successfully." };
    } catch (error) {
        console.log("🚀 -> actions.ts:36 -> createPost -> error:", error);
        return { message: "Database Error: Failed to Create Post." };
    }
}

export async function deletePost(formData: FormData) {
    const { id } = DeletePost.parse({
        id: formData.get("id"),
    });

    try {
        const userId = await getUserId();

        const post = await prisma.post.findUnique({
            where: { id, userId },
        });

        if (!post) {
            throw new Error("Post not found or you do not have permission to delete it.");
        }

        await prisma.post.delete({
            where: { id },
        });

        revalidatePath("/dashboard");
        return { status: "200", message: "Post deleted successfully." };
    } catch (error) {
        console.error("🚀 -> actions.ts:59 -> deletePost -> error:", error);
        return { status: "500", message: "Database Error: Failed to Delete Post." };
    }
}

export async function likePost(value: string) {
    const validateFields = LikeSchema.safeParse({ postId: value });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to like Post",
        };
    }

    const { postId } = validateFields.data;

    try {
        const userId = await getUserId();

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new Error("Post not found.");
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });

        if (existingLike) {
            // If the like already exists, remove it
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            revalidatePath("/dashboard");
            return { status: "200", message: "Post unliked successfully." };
        } else {
            // If the like does not exist, create it
            await prisma.like.create({
                data: {
                    postId,
                    userId,
                },
            });

            revalidatePath("/dashboard");
            return { status: "200", message: "Post liked successfully." };
        }
    } catch (error) {
        console.error("🚀 -> actions.ts:78 -> likePost -> error:", error);
        return { status: "500", message: "Database Error: Failed to like Post." };
    }
}
