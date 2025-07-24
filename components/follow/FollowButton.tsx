"use client";

import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/common";
import { buttonVariants } from "@/components/ui/button";
import { followUser } from "@/lib/actions";
import { toast } from "sonner";

type Props = {
    isFollowing: boolean | undefined;
    profileId: string;
    className?: string;
    buttonClassName?: string;
};

function FollowButton({ isFollowing, profileId, className, buttonClassName }: Props) {
    const handleFollowUser = async (formData: FormData) => {
        const response = await followUser(formData);
        if (response.status === "200") {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <form action={handleFollowUser} className={className}>
            <input type="hidden" value={profileId} name="id" />
            <SubmitButton
                className={buttonVariants({
                    variant: isFollowing ? "secondary" : "default",
                    className: cn("!font-bold w-full", buttonClassName),
                    size: "sm",
                })}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </SubmitButton>
        </form>
    );
}
export default FollowButton;
