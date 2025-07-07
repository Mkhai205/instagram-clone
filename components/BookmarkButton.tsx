"use client";

import { PostWithExtras } from "@/lib/definitions";
import { useCallback, useMemo, useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
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
            <ActionIcon>
                <Bookmark
                    className={cn("!h-6 !w-6", {
                        "dark:fill-white fill-black": alreadyBookmarked,
                    })}
                />
            </ActionIcon>
        </form>
    );
}
export default BookmarkButton;
