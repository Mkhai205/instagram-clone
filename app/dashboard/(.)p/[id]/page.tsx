import { PostView } from "@/components/posts";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

async function PostModal({ params }: Props) {
    const post = await fetchPostById(params.id);

    if (!post) {
        notFound();
    }
    return <PostView post={post} />;
}
export default PostModal;
