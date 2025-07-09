"use client";

import Error from "@/components/Error";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/useMount";
import { createPost } from "@/lib/actions";
import { CreatePost } from "@/lib/schemas";
import { UploadDropzone } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function CreatePage() {
    const router = useRouter();
    const pathname = usePathname();
    const isCreatePage = pathname === "/dashboard/create";
    const mount = useMount();
    const form = useForm<z.infer<typeof CreatePost>>({
        resolver: zodResolver(CreatePost),
        defaultValues: {
            caption: "",
            fileUrl: undefined,
        },
    });

    const fileUrl = form.watch("fileUrl");

    if (!mount) return null;

    return (
        <div>
            <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back()}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Create new post</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(async (values) => {
                                const response = await createPost(values);
                                if (response) {
                                    return toast.error(<Error response={response} />);
                                }
                            })}
                            className="space-y-4"
                        >
                            {!!fileUrl ? (
                                <>
                                    <div className="h-96 md:h-[500px] overflow-hidden rounded-md">
                                        <AspectRatio ratio={4 / 6} className="relative h-full">
                                            <Image
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
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
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="picture">Picture</FormLabel>
                                            <FormControl>
                                                <UploadDropzone
                                                    endpoint="fileUploader"
                                                    onClientUploadComplete={(res) => {
                                                        form.setValue("fileUrl", res[0].ufsUrl);
                                                        toast.success(
                                                            "Image uploaded successfully!"
                                                        );
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        console.error(error);
                                                        toast.error("Image upload failed.");
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Upload a picture to post
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <Button type="submit" disabled={form.formState.isSubmitSuccessful}>
                                Create Post
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default CreatePage;
