"use client";

import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import { Heart } from "lucide-react";
import { useCallback, useMemo, useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { likePost } from "@/lib/actions";

type OptimisticLike = {
    postId: string;
    userId: string;
};

function LikeButton({ post, userId }: { post: PostWithExtras; userId?: string }) {
    const predicate = useCallback(
        (like: Like) => like.userId === userId && like.postId === post.id,
        [userId, post.id]
    );

    const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[], OptimisticLike>(
        post.likes,
        (state, newLike) => {
            const alreadyLiked = state.some(predicate);

            return alreadyLiked
                ? state.filter((like) => like.userId !== newLike.userId)
                : [
                      ...state,
                      {
                          ...newLike,
                          id: crypto.randomUUID(), // sinh ID tạm thời
                          createdAt: new Date(),
                          updatedAt: new Date(),
                      },
                  ];
        }
    );

    const alreadyLiked = useMemo(
        () => optimisticLikes.some(predicate),
        [optimisticLikes, predicate]
    );

    return (
        <div className="flex flex-col">
            <form
                action={async (formData: FormData) => {
                    const postId = formData.get("postId") as string;
                    if (!userId) return;

                    addOptimisticLike({ postId, userId });

                    await likePost(postId);
                }}
            >
                <input type="hidden" name="postId" value={post.id} />

                <ActionIcon
                    className={cn({
                        "hover:text-neutral-400 dark:hover:text-neutral-500": !alreadyLiked,
                    })}
                >
                    <Heart
                        className={`!w-6 !h-6 ${cn({ "text-red-500 fill-red-500": alreadyLiked })}`}
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
