"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreatePost } from "./schemas";

export async function createPost(values: z.infer<typeof CreatePost>) {
    const validateFields = CreatePost.safeParse(values);

    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, message: "Validation failed" };
    }

    const { caption, fileUrl } = validateFields.data;

    // Create post logic here
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
    } catch (error) {
        console.log("🚀 -> actions.ts:36 -> createPost -> error:", error);

        return { message: "Database Error: Failed to Create Post." };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}
