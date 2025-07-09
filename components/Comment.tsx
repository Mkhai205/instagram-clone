"use client";

import { CommentWithExtras } from "@/lib/definitions";
import CommentOptions from "@/components/CommentOptions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Timestamp from "./Timestamp";

type Props = {
    comment: CommentWithExtras;
    inputRef?: React.RefObject<HTMLInputElement>;
};

function Comment({ comment, inputRef }: Props) {
    const { data: session } = useSession();
    const username = comment.user.username;
    const href = `/dashboard/${username}`;

    return (
        <div className="group p-3 px-3.5 flex items-start space-x-2.5 w-full overflow-hidden">
            <Link href={href} className="shrink-0">
                <UserAvatar user={comment.user} className="w-8 h-8" />
            </Link>
            <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-start text-sm w-full flex-wrap gap-1">
                    <Link href={href} className="font-semibold shrink-0">
                        {username}
                    </Link>
                    <p className="text-gray-900 dark:text-gray-200 break-words overflow-wrap-anywhere">
                        {comment.body}
                    </p>
                </div>
                <div className="flex h-5 items-center space-x-2.5">
                    <Timestamp createdAt={comment.createdAt} />
                    <button
                        className="text-xs font-semibold text-neutral-500"
                        onClick={() => inputRef?.current?.focus()}
                    >
                        Reply
                    </button>
                    {comment.userId === session?.user.id && <CommentOptions comment={comment} />}
                </div>
            </div>
        </div>
    );
}

export default Comment;
