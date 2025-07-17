import PostsGrid from "@/components/PostsGrid";
import { fetchPostByUsername } from "@/lib/data";

type Props = {
    params: { username: string };
};

async function ProfilePage({ params }: Props) {
    const username = decodeURIComponent(params.username);
    const posts = await fetchPostByUsername(username);
    return <PostsGrid posts={posts} />;
}
export default ProfilePage;
