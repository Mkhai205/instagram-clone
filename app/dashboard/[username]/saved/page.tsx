import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import { fetchSavedPostsByUsername } from "@/lib/data";
import { redirect } from "next/navigation";

type Props = {
    params: { username: string };
};

async function SavedPage({ params: { username } }: Props) {
    const session = await auth();
    const currentUsername = session?.user?.username;
    const decodedUsername = decodeURIComponent(username);

    if (!session || currentUsername !== decodedUsername) {
        redirect(`/dashboard/${decodedUsername}`);
    }

    const savedPosts = await fetchSavedPostsByUsername(decodedUsername);
    const posts = savedPosts?.map((savedPost) => savedPost.post);

    return <PostsGrid posts={posts} />;
}
export default SavedPage;
