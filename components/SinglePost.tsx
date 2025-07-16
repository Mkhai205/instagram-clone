import { auth } from "@/auth";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import Post from "@/components/Post";
import PostActions from "@/components/PostActions";
import PostOptions from "@/components/PostOptions";
import UserAvatar from "@/components/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPostById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "./ui/card";
import MiniPost from "./MiniPost";
import Timestamp from "./Timestamp";

async function SinglePost({ id }: { id: string }) {
    const post = await fetchPostById(id);
    const session = await auth();
    const postUsername = post?.user.username;
    const userId = session?.user.id;
    const href = `/dashboard/${postUsername}`;

    if (!post) {
        notFound();
    }

    return (
        <div>
            <Card className="h-[540px] md:h-[600px] max-w-3xl lg:max-w-4xl hidden sm:flex sm:mx-auto">
                <div className="relative overflow-hidden max-w-sm md:max-w-md lg:max-w-lg w-full">
                    <Image
                        src={post.fileUrl}
                        alt="Post preview"
                        fill
                        className="sm:rounded-l-md object-cover"
                    />
                </div>

                <div className="flex max-w-md flex-col flex-1">
                    <div className="flex items-center justify-between border-b px-5 py-3">
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="flex items-center space-x-2.5">
                                    <Link href={href}>
                                        <UserAvatar user={post.user} className="w-8 h-8" />
                                    </Link>

                                    <div className="text-sm">
                                        <p className="space-x-1">
                                            <Link href={href} className="font-semibold text-sm">
                                                {postUsername}
                                            </Link>
                                            <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">
                                                •
                                            </span>
                                            <Timestamp createdAt={post.createdAt} />
                                        </p>
                                        <p className="text-xs text-black dark:text-white font-normal">
                                            Hanoi, Vietnam
                                        </p>
                                    </div>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div className="flex items-center space-x-2">
                                    <UserAvatar user={post.user} className="h-14 w-14" />
                                    <div>
                                        <p className="font-bold">{postUsername}</p>
                                        <p className="text-sm font-medium dark:text-neutral-400">
                                            {post.user.name}
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <PostOptions post={post} userId={userId} />
                    </div>

                    {post.comments.length === 0 ? (
                        <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
                            <p className="text-xl lg:text-2xl font-extrabold text-center">
                                No comments yet.
                            </p>
                            <p className="text-sm font-medium">Start the conversation.</p>
                        </div>
                    ) : (
                        <ScrollArea className="hidden sm:inline py-1.5 flex-1">
                            <MiniPost post={post} />
                            {post.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </ScrollArea>
                    )}

                    <div className="px-2 hidden md:block mt-auto border-y p-2.5">
                        <PostActions post={post} userId={userId} />
                        <time className="text-[11px] uppercase text-zinc-500 font-medium">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                    <CommentForm postId={id} className="hidden md:inline-flex" />
                </div>
            </Card>
            <div className="w-full max-w-[472px] mx-auto sm:hidden">
                <Post post={post} />
            </div>
        </div>
    );
}

export default SinglePost;
