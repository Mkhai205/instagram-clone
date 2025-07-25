import { MorePosts } from "@/components/posts";
import { SinglePost } from "@/components/posts";
import { SinglePostSkeleton } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

type Props = {
    params: {
        id: string;
    };
};

function PostPage({ params }: Props) {
    return (
        <div>
            <Suspense fallback={<SinglePostSkeleton />}>
                <SinglePost id={params.id} />
            </Suspense>

            <Separator className="my-12 max-w-3xl lg:max-w-4xl" />

            <Suspense fallback={<div className="font-semibold">Loading more posts...</div>}>
                <MorePosts postId={params.id} />
            </Suspense>
        </div>
    );
}
export default PostPage;
