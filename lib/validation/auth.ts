import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim().max(254),
  password: z.string().min(8).max(128),
  lang: z.enum(["en", "ar", "fr"]),
});

export const inviteSchema = z.object({
  email: z.email().trim().toLowerCase().max(254),
  role: z.enum(["teacher", "parent", "adult_student"]),
  lang: z.enum(["en", "ar", "fr"]),
});
