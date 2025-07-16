"use client";

import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import UserAvatar from "./UserAvatar";

function ProfileLink({ user }: { user: User }) {
    const pathname = usePathname();
    const href = `/dashboard/${user.username}`;
    const isActive = pathname.startsWith(href);
    return (
        <Link
            href={href}
            className={buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                className: "navLink",
                size: "lg",
            })}
        >
            <UserAvatar
                user={user}
                className={`relative h-7 w-7 ${isActive && "border-2 border-white"}`}
            />

            <p
                className={cn("hidden lg:block", {
                    "font-extrabold": isActive,
                })}
            >
                Profile
            </p>
        </Link>
    );
}
export default ProfileLink;
