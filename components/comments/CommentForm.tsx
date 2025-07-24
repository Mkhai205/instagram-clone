"use client";

import { CreateComment } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { createComment } from "@/lib/actions";
import { Loader2 } from "lucide-react";

type PostViewProps = {
    postId: string;
    className?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
};

function CommentForm({ postId, className, inputRef }: PostViewProps) {
    const form = useForm<z.infer<typeof CreateComment>>({
        resolver: zodResolver(CreateComment),
        defaultValues: {
            body: "",
            postId: postId,
        },
    });

    const body = form.watch("body");
    const isSubmitting = form.formState.isSubmitting;
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(async (values) => {
                    await createComment(values);
                    form.reset();
                })}
                className={cn(
                    `relative border-b border-gray-200 dark:border-neutral-800 
                    px-2 py-3 flex items-center space-x-2 w-full`,
                    className
                )}
            >
                {isSubmitting && (
                    <div className="absolute flex justify-center items-center w-full">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => {
                        return (
                            <FormItem className="w-full flex">
                                <FormControl>
                                    <input
                                        disabled={isSubmitting}
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="bg-transparent text-sm border-none focus:outline-none
                                        flex-1 dark:text-neutral-400 placeholder-neu400 font-medium disabled:opacity-30"
                                        {...field}
                                        ref={inputRef || field.ref}
                                    />
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />

                {body.trim().length > 0 && (
                    <button
                        type="submit"
                        disabled={isSubmitting}
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
    );
}
export default CommentForm;
