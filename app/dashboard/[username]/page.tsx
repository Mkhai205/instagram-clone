import PostsGrid from "@/components/PostsGrid";
import { fetchPostByUsername } from "@/lib/data";

type Props = {
    params: { username: string };
};

async function ProfilePage({ params }: Props) {
    const posts = await fetchPostByUsername(params.username);
    return <PostsGrid posts={posts} />;
}
export default ProfilePage;
