"use client";

import { UserWithExtras } from "@/lib/definitions";
import { BookMarked, Clapperboard, Contact, Grid3X3 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList } from "./ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "./ui/separator";

type Props = {
    profile: UserWithExtras;
    isCurrentUser: boolean;
};

const profileTabs = [
    {
        title: "Posts",
        href: "",
        Icon: Grid3X3,
        public: true,
    },
    {
        title: "Reels",
        href: "reels",
        Icon: Clapperboard,
        public: true,
    },
    {
        title: "Saved",
        href: "saved",
        Icon: BookMarked,
        public: false,
    },
    {
        title: "Tagged",
        href: "tagged",
        Icon: Contact,
        public: true,
    },
];

function ProfileTabs({ profile, isCurrentUser }: Props) {
    const pathname = decodeURIComponent(usePathname());
    const profilePage = `/dashboard/${profile.username}`;

    return (
        <Tabs defaultValue="posts" className="pt-14 md:pt-36 pb-12">
            <TabsList className="p-px bg-zinc-300 dark:bg-neutral-800 h-px w-full gap-x-10">
                {profileTabs.map((tab) => {
                    if (!tab.public && !isCurrentUser) return null;

                    const isActive =
                        tab.href === ""
                            ? pathname === profilePage
                            : pathname === `${profilePage}/${tab.href}`;

                    return (
                        <TabsTrigger
                            asChild
                            key={tab.title}
                            value={tab.href}
                            className={cn(
                                "flex flex-col mt-8 gap-4 !p-0 data-[state=active]:text-neutral-400",
                                isActive ? "!text-neutral-700 dark:!text-white" : "text-neutral-400"
                            )}
                        >
                            <Link href={`/dashboard/${profile.username}/${tab.href}`}>
                                <Separator
                                    className={cn(
                                        "!h-px w-16",
                                        isActive
                                            ? "!bg-neutral-700 dark:!bg-white"
                                            : "dark:!bg-neutral-800 bg-zinc-300"
                                    )}
                                />
                                <div className="flex items-center gap-x-1">
                                    <tab.Icon className="h-3 w-3" />
                                    <p className="font-bold text-xs tracking-wider uppercase">
                                        {tab.title}
                                    </p>
                                </div>
                            </Link>
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    );
}
export default ProfileTabs;
