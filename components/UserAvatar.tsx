import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
    user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
    return (
        <Avatar {...avatarProps}>
            <Image
                fill
                sizes="24px"
                priority={true}
                className="rounded-full object-cover"
                alt={`${user?.name}'s profile picture`}
                src={user?.image || "/images/kakadev_logo.jpg"}
            />
        </Avatar>
    );
}

export default UserAvatar;
