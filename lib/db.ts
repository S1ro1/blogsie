import "@/lib/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql as psql} from "@vercel/postgres";

import { eq, and, sql} from 'drizzle-orm';

import * as schema from "./schema"
import {posts, users} from "./schema";

export const db = drizzle(psql, { schema});

export const getPosts = async () => {
  const selectResults = await db.select().from(posts);
  console.log(selectResults);

  return selectResults;
}

export type NewPost = typeof posts.$inferInsert;

export const insertPost = async (newPost: NewPost) => {
  return db.insert(posts).values(newPost).returning();
}

export type NewUser = typeof users.$inferInsert;

export const login = async (email: string, password: string) => {
  const user = await db.select().from(users).limit(1).where(
    and(
      eq(users.email, email),
      eq(users.password, password)
    )
  );

  console.log(user);
  return user[0];
}

export const insertUser = async (newUser: NewUser) => {
  return db.insert(users).values(newUser).returning();
}
