import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import { Button, buttonVariants } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { fetchProfileByUsername } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: { username: string };
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): // parent: ResolvingMetadata
Promise<Metadata> {
    const username = decodeURIComponent(params.username);
    const profile = await fetchProfileByUsername(username);

    return {
        title: `${profile?.name} (@${profile?.username})`,
    };
}

async function ProfileLayout({ children, params }: Props) {
    const username = decodeURIComponent(params.username);
    const profile = await fetchProfileByUsername(username);

    const session = await auth();
    const isCurrentUser = session?.user?.id === profile?.id;
    const isFollowing = profile?.followedBy.some((user) => user.followerId === session?.user?.id);

    if (!profile) return notFound();

    const postsCount = profile.posts.length;
    const followersCount = profile.followedBy.length;
    const followingCount = profile.following.length;

    return (
        <>
            <ProfileHeader username={profile.username} />
            <div className="max-w-[52rem] mx-auto">
                <div className="flex gap-x-5 md:gap-x-10 px-4">
                    <ProfileAvatar user={profile}>
                        <UserAvatar
                            user={profile}
                            className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
                        />
                    </ProfileAvatar>

                    <div className="md:px-10 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
                            <p className="font-semibold text-xl">{profile.username} </p>
                            {isCurrentUser ? (
                                <>
                                    <Button
                                        size={"icon"}
                                        variant={"ghost"}
                                        className="md:order-last"
                                    >
                                        <Settings />
                                    </Button>
                                    <Link
                                        href={`/dashboard/edit_profile`}
                                        className={buttonVariants({
                                            className: "!font-bold",
                                            variant: "secondary",
                                            size: "sm",
                                        })}
                                    >
                                        Edit profile
                                    </Link>
                                    <Button variant={"secondary"} className="font-bold" size={"sm"}>
                                        View archive
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size={"icon"}
                                        variant={"ghost"}
                                        className="md:order-last"
                                    >
                                        <MoreHorizontal />
                                    </Button>
                                    <FollowButton
                                        isFollowing={isFollowing}
                                        profileId={profile.id}
                                    />
                                    <Button variant={"secondary"} className="font-bold" size={"sm"}>
                                        Message
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-x-7">
                            <p>
                                <strong>{postsCount}</strong> {postsCount > 1 ? "posts" : "post"}
                            </p>

                            <Link href={`/dashboard/${profile.username}/followers`}>
                                <strong>{followersCount}</strong>{" "}
                                {followersCount > 1 ? "followers" : "follower"}
                            </Link>
                            <Link href={`/dashboard/${profile.username}/following`}>
                                <strong>{followingCount}</strong> following
                            </Link>
                        </div>

                        <div className="text-sm">
                            <div className="font-bold">{profile.name}</div>
                            <p
                                className="max-w-96 whitespace-pre-wrap break-words 
                                overflow-wrap-anywhere line-clamp-5 overflow-hidden"
                            >
                                {profile.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />
                {children}
            </div>
        </>
    );
}
export default ProfileLayout;
