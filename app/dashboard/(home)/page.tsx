import React, { Suspense } from "react";
import { Posts } from "@/components/posts";
import { PostsSkeleton } from "@/components/common";

function DashboardPage() {
    return (
        <main className="flex w-full flex-grow">
            <div className="flex flex-col gap-y-8 w-full max-w-[472px] mx-auto pb-20">
                <Suspense fallback={<PostsSkeleton />}>
                    <Posts />
                </Suspense>
            </div>
        </main>
    );
}

export default DashboardPage;
