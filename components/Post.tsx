import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import { PostWithExtras } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import { Card } from "./ui/card";
import Timestamp from "./Timestamp";
import PostOptions from "./PostOptions";
import PostActions from "./PostActions";

async function Post({ post }: { post: PostWithExtras }) {
    const session = await auth();
    const userId = session?.user?.id;
    const username = post.user.username;

    if (!session?.user) return null;

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex gap-x-3 items-center">
                    <UserAvatar user={post.user} className="w-8 h-8" />

                    <div className="text-sm">
                        <p className="space-x-1">
                            <span className="font-semibold">{username}</span>
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

                <PostOptions post={post} userId={userId} />
            </div>
            <Card className="relative h-[580px] w-full overflow-hidden rounded-sm">
                <Image
                    fill
                    sizes="500px"
                    src={post.fileUrl}
                    alt="Post image"
                    className="rounded-sm object-cover"
                />
            </Card>

            <PostActions post={post} userId={userId} />

            {post.caption && (
                <div className="text-sm leading-none flex items-center gap-x-2 font-medium ml-0.5">
                    <Link href={`/dashboard/${username}`}>{username}</Link>
                    <p>{post.caption}</p>
                </div>
            )}

            <Comments postId={post.id} comments={post.comments} user={session.user} />
        </div>
    );
}
export default Post;
