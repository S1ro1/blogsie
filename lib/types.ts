import z from "zod";
import {posts, users, usersToLikedPosts} from "@/lib/schema";

export const newUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  repeatPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).superRefine((data) => {
  if (data.password !== data.repeatPassword) {
    return {
      message: "Passwords do not match",
    }
  }
})

export type NewPost = typeof posts.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewUserToLikedPost = typeof usersToLikedPosts.$inferInsert;