"use client";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SubmitButton } from "@/components/common";
import { Comment } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { deleteComment } from "@/lib/actions";

type Props = {
    comment: Comment;
};

function CommentOptions({ comment }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MoreHorizontal className="h-5 w-5 hidden group-hover:inline cursor-pointer dark:text-neutral-400" />
            </DialogTrigger>
            <DialogContent close={false} className="dialogContent">
                <form
                    action={async (formData) => {
                        const { status, message } = await deleteComment(formData);
                        if (status === "200") {
                            toast.success(message);
                        } else {
                            toast.error(message);
                        }
                    }}
                    className="postOption"
                >
                    <input type="hidden" name="id" value={comment.id} />
                    <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
                        Delete
                    </SubmitButton>
                </form>

                <DialogClose className="postOption border-0 w-full p-3">Cancel</DialogClose>
            </DialogContent>
        </Dialog>
    );
}

export default CommentOptions;
