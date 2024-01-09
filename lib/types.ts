import z from "zod";
import {posts, postsToTags, tags, users, usersToLikedPosts} from "@/lib/schema";

export const newUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  repeatPassword: z.string(),
}).superRefine((data) => {
  if (data.password !== data.repeatPassword) {
    return {
      message: "Passwords do not match",
    }
  }
})

export const newPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  content: z.string().min(1, "Content must be at least 1 character long"),
})

export type NewPost = typeof posts.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewTag = typeof tags.$inferInsert;

// M:N
export type NewUserToLikedPost = typeof usersToLikedPosts.$inferInsert;
export type NewPostToTag = typeof postsToTags.$inferInsert;
