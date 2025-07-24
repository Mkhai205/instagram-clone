import { FollowingModal } from "@/components/follow";
import { fetchProfileByUsername } from "@/lib/data";

async function FollowingPage({ params: { username } }: { params: { username: string } }) {
    const profile = await fetchProfileByUsername(username);
    const following = profile?.following;

    return <FollowingModal following={following} username={username} />;
}
export default FollowingPage;
