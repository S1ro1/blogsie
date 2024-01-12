import z from "zod";
import {
  posts,
  postsToTags,
  tags,
  users,
  usersToLikedPosts,
} from "@/lib/schema";
import { fetchPosts } from "@/lib/db";

export const newUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string(),
  })
  .superRefine((data) => {
    if (data.password !== data.repeatPassword) {
      return {
        message: "Passwords do not match",
      };
    }
  });

export const editUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageLink: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size < 5 * 1024 * 1024;
      },
      {
        message: "File size must be less than 5MB",
      },
    ),
});

export const newPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  content: z.string().min(1, "Content must be at least 1 character long"),
});

export type NewPost = typeof posts.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewTag = typeof tags.$inferInsert;

// M:N
export type NewUserToLikedPost = typeof usersToLikedPosts.$inferInsert;
export type NewPostToTag = typeof postsToTags.$inferInsert;

// Fetching data
type ResolvedType<T> = T extends Promise<infer R> ? R : T;
export type FetchPostsResultType = ResolvedType<ReturnType<typeof fetchPosts>>;

export type UserType = Omit<typeof users.$inferSelect, "password">;
