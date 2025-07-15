import { z } from "zod";

// Post Schema
export const PostSchema = z.object({
    id: z.string(),
    fileUrl: z.string({ required_error: "File URL is required" }).url(),
    caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

// Like LikeSchema
export const LikeSchema = z.object({
    postId: z.string(),
});

// Bookmark Schema
export const BookmarkSchema = z.object({
    postId: z.string(),
});

// Comment Schema
export const CommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    body: z.string().min(1, { message: "Comment body is required" }),
});

export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });

// User Schema
export const UserSchema = z.object({
    id: z.string(),
    username: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(),
    bio: z.string().max(150).optional(),
    website: z.string().url().optional(),
    gender: z.string().optional(),
});

export const CreateUser = UserSchema.omit({ id: true });
export const UpdateUser = UserSchema;
export const DeleteUser = UserSchema.pick({ id: true });
export const FollowUser = UserSchema.pick({ id: true });
