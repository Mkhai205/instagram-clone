"use client";

import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useCallback, useMemo, useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { likePost } from "@/lib/actions";

type LikeProps = {
    postId: string;
    userId: string;
};

function LikeButton({ post, userId }: { post: PostWithExtras; userId?: string }) {
    const predicate = useCallback(
        (like: LikeProps) => like.userId === userId && like.postId === post.id,
        [userId, post.id]
    );

    const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeProps[], LikeProps>(
        post.likes,
        (state, newLike) => {
            const alreadyLiked = state.some(predicate);

            return alreadyLiked
                ? state.filter((like) => like.userId !== newLike.userId)
                : [...state, newLike];
        }
    );

    const alreadyLiked = useMemo(
        () => optimisticLikes.some(predicate),
        [optimisticLikes, predicate]
    );

    const handleActionLike = async (formData: FormData) => {
        const postId = formData.get("postId") as string;
        if (!userId) return;

        addOptimisticLike({ postId, userId });

        await likePost(postId);
    };

    return (
        <div className="flex flex-col items-center">
            <form action={handleActionLike}>
                <input type="hidden" name="postId" value={post.id} />

                <ActionIcon>
                    <Heart
                        className={cn("!h-6 !w-6", { "text-red-500 fill-red-500": alreadyLiked })}
                    />
                </ActionIcon>
            </form>
            {optimisticLikes.length > 0 && (
                <p className="text-sm font-semibold dark:text-white">
                    {optimisticLikes.length} {optimisticLikes.length === 1 ? "like" : "likes"}
                </p>
            )}
        </div>
    );
}

export default LikeButton;
