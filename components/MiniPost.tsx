"use client";

import { PostWithExtras } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import Timestamp from "./Timestamp";

function MiniPost({ post }: { post: PostWithExtras }) {
    const username = post.user.username;
    const href = `/dashboard/${username}`;
    const { data: session } = useSession();
    const user = session?.user;

    if (!user) return null;

    return (
        <div className="group p-3 flex space-x-2.5">
            <Link href={href}>
                <UserAvatar user={post.user} className="w-8 h-8" />
            </Link>

            <div className="flex flex-col items-start">
                <div className="flex items-center space-x-1.5 leading-none text-sm">
                    <Link href={href} className="font-semibold">
                        {username}
                    </Link>
                    <p className="font-medium">{post.caption}</p>
                </div>
                <div className="h-5 text-neutral-500 text-sm space-x-1.5">
                    <Timestamp createdAt={post.createdAt} />
                </div>
            </div>
        </div>
    );
}
export default MiniPost;
