import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";

export function PostSkeleton() {
    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-3.5 w-[240px]" />
                    <Skeleton className="h-3.5 w-[180px]" />
                </div>
            </div>

            <Skeleton className="h-[580px]" />
        </div>
    );
}

export function PostsSkeleton() {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
            ))}
        </>
    );
}

export function EditPostSkeleton() {
    return (
        <Dialog open>
            <DialogContent className="w-[472px] max-w-full rounded-t-md">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>

                <div className="h-[450px] md:h-[480px] overflow-hidden rounded-md">
                    <AspectRatio ratio={8 / 10} className="relative h-full">
                        <Skeleton className="h-full w-full" />
                    </AspectRatio>
                </div>

                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-16" />
            </DialogContent>
        </Dialog>
    );
}

export async function ViewPostSkeleton() {
    return (
        <Dialog open>
            <DialogContent
                className="flex gap-0 flex-col md:flex-row items-start p-0 w-3/4 md:max-w-3xl
                lg:max-w-4xl xl:max-w-5xl h-full max-h-[640px] md:max-h-[600px] lg:max-h-[660px] 
                xl:max-h-[700px] rounded-t-md sm:rounded-md"
            >
                <Skeleton
                    className="relative overflow-hidden h-full max-w-3xl w-full 
                    rounded-t-md sm:rounded-md"
                />

                <div className="flex flex-col h-full py-4 px-3 flex-1">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-[250px]" />
                            <Skeleton className="h-3 w-[200px]" />
                        </div>
                    </div>

                    <Skeleton className="flex-1 my-4" />

                    <div className="flex items-center w-full space-x-4">
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-3 w-full flex-1" />
                            <Skeleton className="h-3 w-[280px]" />
                            <Skeleton className="h-3 w-[280px]" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function UserAvatarSkeleton() {
    return (
        <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export function SinglePostSkeleton() {
    return (
        <>
            <Card className="h-[540px] md:h-[600px] max-w-3xl lg:max-w-4xl hidden sm:flex mx-auto">
                <div className="relative overflow-hidden max-w-sm md:max-w-md lg:max-w-lg w-full">
                    <Skeleton className="h-full w-full rounded-r-none" />
                </div>

                <div className="flex max-w-md flex-col flex-1">
                    <div className="flex items-center justify-between border-b px-5 py-3">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                    </div>

                    <div className="px-5 space-y-3 mt-8">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <UserAvatarSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </Card>
            <div className="max-w-md mx-auto sm:hidden">
                <PostSkeleton />
            </div>
        </>
    );
}
