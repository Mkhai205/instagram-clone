"use client";

import { Link, Send } from "lucide-react";
import ActionIcon from "./ActionIcon";
import { toast } from "sonner";

function ShareButton({ postId }: { postId: string }) {
    const handleShare = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/dashboard/p/${postId}`);
        toast("Link copied to clipboard!", {
            icon: <Link className="!h-5 !w-5" />,
        });
    };
    return (
        <ActionIcon onClick={handleShare}>
            <Send className="!w-6 !h-6" />
        </ActionIcon>
    );
}
export default ShareButton;
