"use client";

import { PostWithExtras } from "@/lib/definitions";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/common";
import Link from "next/link";
import { toast } from "sonner";
import { deletePost } from "@/lib/actions";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type PostOptionsProps = {
    post: PostWithExtras;
    userId?: string;
    className?: string;
};

function PostOptions({ post, userId, className }: PostOptionsProps) {
    const isMyPost = userId === post.user.id;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <MoreHorizontal
                    className={cn(
                        "w-5 h-5 cursor-pointer dark:text-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-400",
                        className
                    )}
                />
            </DialogTrigger>
            <DialogContent close={false} className="dialogContent">
                {isMyPost && (
                    <>
                        <form
                            action={async (formData) => {
                                const { status, message } = await deletePost(formData);

                                if (status === "200") {
                                    toast.success(message);
                                } else {
                                    toast.error(message);
                                }
                                setOpen(false);
                                if (!isDashboard) {
                                    router.push("/dashboard");
                                }
                            }}
                            className="postOption"
                        >
                            <input type="hidden" name="id" value={post.id} />
                            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3 sm:rounded-lg">
                                Delete post
                            </SubmitButton>
                        </form>

                        <Link
                            scroll={false}
                            href={`/dashboard/p/${post.id}/edit`}
                            className="postOption p-3"
                        >
                            Edit
                        </Link>
                    </>
                )}

                <form action="" className="postOption">
                    <button className="w-full p-3 sm:rounded-lg">Hide like count</button>
                </form>
                <Link href={`/dashboard/p/${post.id}`} className="postOption p-3">
                    Go to post
                </Link>
                <DialogClose className="postOption border-0 w-full p-3">Cancel</DialogClose>
            </DialogContent>
        </Dialog>
    );
}
export default PostOptions;
