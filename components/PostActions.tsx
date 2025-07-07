import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";

type Props = {
    post: PostWithExtras;
    userId?: string;
    className?: string;
};

function PostActions({ post, userId, className }: Props) {
    return (
        <div className={cn("relative flex justify-between items-start w-full", className)}>
            <div className="flex gap-x-2">
                <LikeButton post={post} userId={userId} />
                <Link href={`/dashboard/p/${post.id}`}>
                    <ActionIcon>
                        <MessageCircle className="!w-6 !h-6" />
                    </ActionIcon>
                </Link>
                <ShareButton postId={post.id} />
            </div>
            <BookmarkButton post={post} userId={userId} />
        </div>
    );
}

export default PostActions;
