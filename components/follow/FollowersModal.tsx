"use client";

import useMount from "@/hooks/useMount";
import { FollowerWithExtras } from "@/lib/definitions";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Follower from "./Follower";

type Props = {
    followers: FollowerWithExtras[] | undefined;
    username: string;
};

function FollowersModal({ followers, username }: Props) {
    const mount = useMount();
    const pathname = usePathname();
    const router = useRouter();
    const isFollowersPage = pathname === `/dashboard/${username}/followers`;

    if (!mount || !isFollowersPage) return null;

    return (
        <Dialog open={isFollowersPage} onOpenChange={(open) => !open && router.back()}>
            <DialogContent close={true} className="dialogContent">
                <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-3 w-full">
                    <DialogTitle className="mx-auto font-bold">Followers</DialogTitle>
                </DialogHeader>

                {followers?.length ? (
                    <ScrollArea>
                        {followers?.map((follower) => (
                            <Follower key={follower.followerId} follower={follower} />
                        ))}
                    </ScrollArea>
                ) : (
                    <p className="p-4 text-sm font-medium">This user has no followers</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
export default FollowersModal;
