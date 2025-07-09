"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function PostBack() {
    const router = useRouter();
    return (
        <nav className="sm:hidden w-full flex items-center absolute -top-14 left-0 z-10 px-4 pb-1.5 border-b">
            <span onClick={() => router.back()} className="cursor-pointer">
                <ChevronLeft className="w-8 h-8" />
            </span>
            <p className="text-lg font-bold mx-auto">Post</p>
        </nav>
    );
}
export default PostBack;
