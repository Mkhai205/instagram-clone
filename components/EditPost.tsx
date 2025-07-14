"use client";

import useMount from "@/hooks/useMount";
import { UpdatePost } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { updatePost } from "@/lib/actions";
import Error from "./Error";
import { AspectRatio } from "./ui/aspect-ratio";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { Post } from "@prisma/client";

function EditPost({ post }: { post: Post }) {
    const mount = useMount();
    const pathname = usePathname();
    const isEditPage = pathname === `/dashboard/p/${post.id}/edit`;
    const router = useRouter();
    const form = useForm<z.infer<typeof UpdatePost>>({
        resolver: zodResolver(UpdatePost),
        defaultValues: {
            id: post.id,
            caption: post.caption || "",
            fileUrl: post.fileUrl,
        },
    });

    const fileUrl = form.watch("fileUrl");

    if (!mount) return null;

    return (
        <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
            <DialogContent
                className="w-[472px] max-w-full rounded-t-md"
                aria-describedby="edit-post-dialog"
            >
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(async (values) => {
                            const response = await updatePost(values);

                            if (response) {
                                return toast.error(<Error response={response} />);
                            } else {
                                return toast.success("Post updated successfully!");
                            }
                        })}
                    >
                        <div className="h-[450px] md:h-[480px] overflow-hidden rounded-md">
                            <AspectRatio ratio={8 / 10} className="relative h-full">
                                <Image
                                    fill
                                    sizes="500px"
                                    src={fileUrl}
                                    alt="Post preview"
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>

                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="caption">Caption</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="caption"
                                            id="caption"
                                            placeholder="Write a caption..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            Done
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
export default EditPost;
