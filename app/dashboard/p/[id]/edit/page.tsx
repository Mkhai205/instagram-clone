import EditPost from "@/components/EditPost";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

async function EditPostPage({ params }: Props) {
    const post = await fetchPostById(params.id);

    if (!post) return notFound();

    return <EditPost post={post} />;
}
export default EditPostPage;
