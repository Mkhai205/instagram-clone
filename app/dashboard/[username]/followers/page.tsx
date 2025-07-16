import FollowersModal from "@/components/FollowersModal";
import { fetchProfileByUsername } from "@/lib/data";

async function FollowersPage({ params: { username } }: { params: { username: string } }) {
    const profile = await fetchProfileByUsername(username);
    const followers = profile?.followedBy;

    return <FollowersModal followers={followers} username={username} />;
}
export default FollowersPage;
