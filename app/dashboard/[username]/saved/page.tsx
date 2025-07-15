import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import { fetchSavedPostsByUsername } from "@/lib/data";
import { redirect } from "next/navigation";

async function SavedPage({ params: { username } }: { params: { username: string } }) {
    const session = await auth();
    const currentUsername = session?.user?.username;

    if (!session || currentUsername !== username) {
        redirect(`/dashboard/${username}`);
    }

    const savedPosts = await fetchSavedPostsByUsername(username);
    const posts = savedPosts?.map((savedPost) => savedPost.post);

    return <PostsGrid posts={posts} />;
}
export default SavedPage;
