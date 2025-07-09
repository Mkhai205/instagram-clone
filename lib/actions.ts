"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/utils";
import {
    BookmarkSchema,
    CreateComment,
    CreatePost,
    DeleteComment,
    DeletePost,
    LikeSchema,
} from "./schemas";

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
    } catch (error) {
        console.log("🚀 -> actions.ts:36 -> createPost -> error:", error);
        return { message: "Database Error: Failed to Create Post." };
    }

    redirect("/dashboard");
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

export async function likePost(value: FormDataEntryValue) {
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

export async function bookmarkPost(value: FormDataEntryValue) {
    const validateFields = BookmarkSchema.safeParse({ postId: value });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to bookmark Post",
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

        const existingBookmark = await prisma.savedPost.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });

        if (existingBookmark) {
            // If the bookmark already exists, remove it
            await prisma.savedPost.delete({
                where: {
                    id: existingBookmark.id,
                },
            });
            revalidatePath("/dashboard");
            return { status: "200", message: "Post unbookmarked successfully." };
        } else {
            // If the bookmark does not exist, create it
            await prisma.savedPost.create({
                data: {
                    postId,
                    userId,
                },
            });
            revalidatePath("/dashboard");
            return { status: "200", message: "Post bookmarked successfully." };
        }
    } catch (error) {
        console.error("🚀 -> actions.ts:100 -> bookmarkPost -> error:", error);
        return { status: "500", message: "Database Error: Failed to bookmark Post." };
    }
}

export async function createComment(values: z.infer<typeof CreateComment>) {
    const validateFields = CreateComment.safeParse(values);

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to create Comment",
        };
    }

    const { body, postId } = validateFields.data;

    try {
        const userId = await getUserId();

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new Error("Post not found.");
        }

        await prisma.comment.create({
            data: {
                body,
                postId,
                userId,
            },
        });

        revalidatePath(`/dashboard/p/${postId}`);
        return { status: "200", message: "Comment created successfully." };
    } catch (error) {
        console.error("🚀 -> actions.ts:120 -> createComment -> error:", error);
        return { status: "500", message: "Database Error: Failed to create Comment." };
    }
}

export async function deleteComment(formData: FormData) {
    const { id } = DeleteComment.parse({ id: formData.get("id") });

    try {
        const userId = await getUserId();

        const comment = await prisma.comment.findUnique({
            where: { id, userId },
        });

        if (!comment) {
            throw new Error("Comment not found or you do not have permission to delete it.");
        }

        await prisma.comment.delete({
            where: { id },
        });

        revalidatePath(`/dashboard`);
        return { status: "200", message: "Comment deleted successfully." };
    } catch (error) {
        console.error("🚀 -> actions.ts:140 -> deleteComment -> error:", error);
        return { status: "500", message: "Database Error: Failed to delete Comment." };
    }
}
