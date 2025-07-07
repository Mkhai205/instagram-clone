"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { CreateComment } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { createComment } from "@/lib/actions";

type CommentsProps = {
    postId: string;
    comments: CommentWithExtras[];
    user?: User | null;
};

function Comments({ postId, comments, user }: CommentsProps) {
    const form = useForm<z.infer<typeof CreateComment>>({
        resolver: zodResolver(CreateComment),
        defaultValues: {
            body: "",
            postId: postId,
        },
    });

    const [isPending, startTransition] = useTransition();

    const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithExtras[], string>(
        comments,
        (state: CommentWithExtras[], newComment: string) => {
            return [
                {
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    body: newComment,
                    userId: user?.id as string,
                    postId: postId,
                    user: user as CommentWithExtras["user"],
                },
                ...state,
            ];
        }
    );

    const body = form.watch("body");
    const commentsCount = optimisticComments.length;
    const isSubmitting = form.formState.isSubmitting;

    return (
        <div className="relative space-y-0.5">
            {commentsCount > 1 && (
                <Link
                    scroll={false}
                    href={`/dashboard/p/${postId}`}
                    className="text-sm font-medium text-neutral-500"
                >
                    View all {commentsCount} comments
                </Link>
            )}

            {optimisticComments.slice(0, 3).map((comment, index) => {
                const username = comment.user?.username || "Unknown User";

                return (
                    <div key={index} className="text-sm flex items-center space-x-2">
                        <Link href={`/dashboard/${username}`} className="font-semibold">
                            {username}
                        </Link>
                        <p>{comment.body}</p>
                    </div>
                );
            })}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async (values) => {
                        const valuesCopy = { ...values };
                        form.reset();

                        startTransition(() => {
                            addOptimisticComment(valuesCopy.body);
                        });

                        await createComment(valuesCopy);
                    })}
                    className="border-b border-gray-300 dark:border-neutral-700 pb-3 pt-1
                      flex items-center gap-x-2"
                >
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem className="w-full flex">
                                <FormControl>
                                    <input
                                        type="text"
                                        disabled={isSubmitting || isPending}
                                        placeholder="Add a comment..."
                                        className="bg-transparent text-sm border-none 
                                        focus:outline-none flex-1 placeholder-neutral-500
                                      dark:text-white dark:placeholder-neutral-400"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {body.trim().length > 0 && (
                        <button
                            type="submit"
                            disabled={isSubmitting || isPending}
                            aria-label="Post comment"
                            className="text-sky-500 text-sm font-semibold hover:text-sky-700 
                    dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 
                    disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500"
                        >
                            Post
                        </button>
                    )}
                </form>
            </Form>
        </div>
    );
}
export default Comments;
