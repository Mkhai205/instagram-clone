"use client";

import { PostWithExtras } from "@/lib/definitions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import useMount from "@/hooks/useMount";
import { ScrollArea } from "./ui/scroll-area";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import ViewPost from "./ViewPost";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import Image from "next/image";
import PostOptions from "./PostOptions";
import { VisuallyHidden } from "./ui/visually-hidden";

function PostView({ post }: { post: PostWithExtras }) {
    const router = useRouter();

    const pathname = usePathname();
    const isPostModal = pathname === `/dashboard/p/${post.id}`;

    const { data: session } = useSession();
    const user = session?.user;
    const inputRef = useRef<HTMLInputElement>(null);
    const username = post.user.username;
    const href = `/dashboard/${username}`;
    const mount = useMount();

    if (!mount) return null;

    return (
        <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
            <DialogContent
                aria-describedby={undefined}
                className="flex gap-0 flex-col md:flex-row items-start p-0 w-3/4 md:max-w-3xl
                lg:max-w-4xl xl:max-w-5xl h-full max-h-[640px] md:max-h-[600px] lg:max-h-[660px] 
                xl:max-h-[700px] rounded-t-md sm:rounded-md"
            >
                <VisuallyHidden>
                    <DialogTitle>Post by {username}</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col justify-between md:h-full md:order-2 w-full md:max-w-72 lg:max-w-sm">
                    <DialogHeader
                        className="flex flex-row border-b space-y-0 space-x-2.5 items-center 
                        justify-between py-4 px-3"
                    >
                        <div className="flex items-center space-x-2.5">
                            <Link href={href}>
                                <UserAvatar user={post.user} className="w-8 h-8" />
                            </Link>
                            <Link href={href} className="font-semibold text-sm">
                                {username}
                            </Link>
                        </div>
                        <PostOptions post={post} userId={user?.id} />
                    </DialogHeader>

                    <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
                        <MiniPost post={post} />
                        {post.comments.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment} inputRef={inputRef} />
                            );
                        })}
                    </ScrollArea>

                    <ViewPost className="hidden md:flex border-b" />

                    <div className="px-2 py-2.5 hidden md:block mt-auto border-b">
                        <PostActions post={post} userId={user?.id} />
                        <time className="text-xs uppercase text-neutral-500 font-semibold">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                    <CommentForm
                        postId={post.id}
                        className="hidden md:inline-flex"
                        inputRef={inputRef}
                    />
                </div>

                <div className="relative overflow-hidden h-full max-w-3xl w-full">
                    <Image
                        fill
                        sizes="640px"
                        alt={post.caption || "Post image"}
                        src={post.fileUrl}
                        className="md:rounded-l-md object-cover"
                    />
                </div>

                <PostActions post={post} userId={user?.id} className="md:hidden border-b p-2.5" />
                <CommentForm postId={post.id} className="md:hidden" inputRef={inputRef} />
                <ViewPost className="md:hidden" />
            </DialogContent>
        </Dialog>
    );
}
export default PostView;
