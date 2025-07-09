import SinglePost from "@/components/SinglePost";
import { SinglePostSkeleton } from "@/components/Skeleton";
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

            <Separator className="my-12 max-2-3xl lg:max-w-4xl mx-auto" />

            {/* <Suspense fallback="Loading more posts...">
            <MorePosts postId={id} />
        </Suspense> */}
        </div>
    );
}
export default PostPage;
