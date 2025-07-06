import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import LikeButton from "./LikeButton";
// import ShareButton from "./ShareButton";
// import BookmarkButton from "./BookmarkButton";

type Props = {
    post: PostWithExtras;
    userId?: string;
    className?: string;
};

function PostActions({ post, userId, className }: Props) {
    return (
        <div className={cn("relative flex items-start w-full gap-x-2", className)}>
            <LikeButton post={post} userId={userId} />
            <Link href={`/dashboard/p/${post.id}`}>
                <ActionIcon className="hover:text-neutral-400 dark:hover:text-neutral-500">
                    <MessageCircle className="!w-6 !h-6" />
                </ActionIcon>
            </Link>
            {/* <ShareButton postId={post.id} />
            <BookmarkButton post={post} userId={userId} /> */}
        </div>
    );
}

export default PostActions;
