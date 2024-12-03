import { z } from "zod";
import { profileResponseSchema } from "./auth.model";

export const ownerSchema = profileResponseSchema.pick({
  _id: true,
  email: true,
  name: true,
  image: true,
});

export type Owner = z.infer<typeof ownerSchema>;

export const commentSchema = z.object({
  _id: z.string(),
  owner: ownerSchema,
  message: z.string(),
  create_at: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;

export const postResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.string().array(),
  owner: ownerSchema,
  likes: ownerSchema.array(),
  comments: commentSchema.array(),
  create_at: z.string(),
  update_at: z.string(),
});

export type postResponse = z.infer<typeof postResponseSchema>;

export const likePostSchema = z.object({
  postId: z.string(),
});

export type likePost = z.infer<typeof likePostSchema>;

export const likePostResponseSchema = z.object({
  like: z.boolean(),
});

export type likePostResponse = z.infer<typeof likePostResponseSchema>;

export const commentPostSchema = z.object({
  postId: z.string(),
  comment: z.string(),
});

export type commentPost = z.infer<typeof commentPostSchema>;
