"use client";

import { PostWithExtras } from "@/lib/definitions";
import { useCallback, useMemo, useOptimistic } from "react";
import { ActionIcon } from "@/components/common";
import { Bookmark } from "lucide-react";
import { bookmarkPost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type BookmarkProps = {
    userId: string;
    postId: string;
};

function BookmarkButton({ post, userId }: { post: PostWithExtras; userId?: string }) {
    const predicate = useCallback(
        (bookmark: BookmarkProps) => bookmark.userId === userId && bookmark.postId === post.id,
        [userId, post.id]
    );

    const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
        BookmarkProps[],
        BookmarkProps
    >(post.savedBy, (state: BookmarkProps[], newBookmark: BookmarkProps) => {
        const alreadyBookmarked = state.some(predicate);

        return alreadyBookmarked
            ? state.filter((bookmark) => bookmark.userId !== newBookmark.userId)
            : [...state, newBookmark];
    });

    const alreadyBookmarked = useMemo(
        () => optimisticBookmarks.some(predicate),
        [optimisticBookmarks, predicate]
    );

    const handleActionBookmark = async (formData: FormData) => {
        const postId = formData.get("postId") as string;
        if (!userId) return;

        addOptimisticBookmark({ postId, userId });

        const response = await bookmarkPost(postId);

        if (response?.status === "200") {
            toast.success(response.message);
        } else {
            toast.error(response?.message);
        }
    };

    return (
        <form action={handleActionBookmark}>
            <input type="hidden" name="postId" value={post.id} />
            <ActionIcon className="group relative overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95">
                <Bookmark
                    className={cn(
                        "!h-6 !w-6 transition-all duration-500 ease-in-out transform",
                        "group-hover:scale-110 group-active:scale-90",
                        "hover:drop-shadow-lg",
                        "relative z-10",
                        {
                            "dark:fill-white fill-black shadow-lg": alreadyBookmarked,
                            "group-hover:fill-gray-600 dark:group-hover:fill-gray-300 stroke-2":
                                !alreadyBookmarked,
                        }
                    )}
                />
                {/* Ripple effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full scale-0 group-active:scale-100 transition-transform duration-300" />
            </ActionIcon>
        </form>
    );
}
export default BookmarkButton;
