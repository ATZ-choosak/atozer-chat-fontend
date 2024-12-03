import { z } from "zod";

export const inputLoginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(1, "Password is required."),
});

export type inputLogin = z.infer<typeof inputLoginSchema>;

export const loginResponseSchema = z.object({
  message: z.string(),
});

export type loginResponse = z.infer<typeof loginResponseSchema>;

export const profileResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  is_verify: z.boolean(),
  google_id: z.string().optional(),
});

export type profileResponse = z.infer<typeof profileResponseSchema>;

export const profileSchema = z.object({
  profile: profileResponseSchema,
});

export type profile = z.infer<typeof profileSchema>;
