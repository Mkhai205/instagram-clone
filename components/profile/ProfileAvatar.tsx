"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import useMount from "@/hooks/useMount";
import { updateProfile } from "@/lib/actions";
import { UserWithExtras } from "@/lib/definitions";
import { UpdateUser } from "@/lib/schemas";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import UserAvatar from "./UserAvatar";
import { Form } from "@/components/ui/form";
import { Error } from "@/components/common";

function ProfileAvatar({ user, children }: { user: UserWithExtras; children: React.ReactNode }) {
    const { data: session } = useSession();
    const isCurrentUser = session?.user.id === user.id;
    const form = useForm<z.infer<typeof UpdateUser>>({
        resolver: zodResolver(UpdateUser),
        defaultValues: {
            id: user.id,
            image: user.image || "",
            name: user.name || "",
            username: user.username || "",
        },
    });
    const mount = useMount();
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Helper function để handle form submission
    const handleFormSubmit = async (values: z.infer<typeof UpdateUser>) => {
        const response = await updateProfile(values);

        if (response.status === "200") {
            toast.success(response.message);
        } else {
            toast.error(<Error response={response} />);
        }

        setOpen(false);
    };

    const triggerSubmit = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && isUploading) {
            toast.error("Please wait for the upload to complete");
            return;
        }
        setOpen(newOpen);
    };

    if (!mount || !session) return null;

    if (!isCurrentUser) return <UserAvatar user={user} className="w-20 h-20 md:w-36 md:h-36" />;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="dialogContent">
                <DialogHeader>
                    <DialogTitle className="mx-auto font-medium text-xl py-5">
                        {isUploading ? "Uploading..." : "Change Profile Photo"}
                    </DialogTitle>
                </DialogHeader>

                {isCurrentUser && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <UploadButton
                                                className="text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 
                                                dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold 
                                                ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 
                                                ut-button:ring-offset-0 ut-button:w-full"
                                                endpoint="fileUploader"
                                                onUploadBegin={() => {
                                                    setIsUploading(true);
                                                }}
                                                onClientUploadComplete={(res) => {
                                                    setIsUploading(false);
                                                    form.setValue("image", res[0].ufsUrl);
                                                    triggerSubmit();
                                                }}
                                                onUploadError={(error: Error) => {
                                                    setIsUploading(false);
                                                    console.error(error);
                                                    toast.error("Upload failed");
                                                }}
                                                onUploadAborted={() => {
                                                    setIsUploading(false);
                                                    toast.error("Upload was cancelled");
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {user.image && (
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 
                                                    font-bold disabled:cursor-not-allowed w-full text-sm p-3"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        form.setValue("image", "");
                                                        triggerSubmit();
                                                    }}
                                                    disabled={
                                                        form.formState.isSubmitting || isUploading
                                                    }
                                                >
                                                    Remove Current Photo
                                                </button>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}

                            <input type="submit" hidden ref={inputRef} />
                        </form>
                    </Form>
                )}

                <DialogClose className="postOption border-0 w-full p-3">Cancel</DialogClose>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileAvatar;
