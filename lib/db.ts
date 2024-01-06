import "@/lib/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql as psql} from "@vercel/postgres";

import * as schema from "./schema"
import {posts, users, usersToLikedPosts} from "./schema"
import {NewPost, NewUser, NewUserToLikedPost} from "@/lib/types";

export const db = drizzle(psql, { schema});

export const insertPost = async (newPost: NewPost) => {
  return db.insert(posts).values(newPost).returning();
}

export const insertUser = async (newUser: NewUser) => {
  return db.insert(users).values(newUser).returning();
}

export const insertUserToLikedPost = async (newUserToLikedPost: NewUserToLikedPost) => {
  return db.insert(usersToLikedPosts).values(newUserToLikedPost).returning();
}
