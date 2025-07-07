import { z } from "zod";

export const PostSchema = z.object({
    id: z.string(),
    fileUrl: z.string({ required_error: "File URL is required" }).url(),
    caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

export const LikeSchema = z.object({
    postId: z.string(),
});

export const BookmarkSchema = z.object({
    postId: z.string(),
});

export const CommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    body: z.string().min(1, { message: "Comment body is required" }),
});

export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });
