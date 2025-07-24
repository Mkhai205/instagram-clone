"use client";

import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useCallback, useMemo, useOptimistic } from "react";
import { ActionIcon } from "@/components/common";
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
        <div className="flex flex-col items-center gap-1">
            <form action={handleActionLike}>
                <input type="hidden" name="postId" value={post.id} />

                <div className="relative group transition-all duration-200 ease-in-out">
                    <ActionIcon>
                        <Heart
                            className={cn(
                                "!h-6 !w-6 group-hover:scale-110 transition duration-200 ease-in-out",
                                {
                                    "text-red-500 fill-red-500": alreadyLiked,
                                    "text-gray-600 dark:text-gray-400 group-hover:text-red-500":
                                        !alreadyLiked,
                                }
                            )}
                        />
                    </ActionIcon>

                    {/* Subtle glow effect only on hover when not liked */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300",
                            "bg-red-400/10 opacity-0 group-hover:opacity-100",
                            { hidden: !alreadyLiked }
                        )}
                    />
                </div>
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
