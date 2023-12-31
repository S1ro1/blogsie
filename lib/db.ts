import "@/lib/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql} from "@vercel/postgres";

import * as schema from "./schema"
import {posts} from "./schema";

export const db = drizzle(sql, { schema});

export const getPosts = async () => {
  const selectResults = await db.select().from(posts);
  console.log(selectResults);

  return selectResults;
}

export type NewPost = typeof posts.$inferInsert;

export const insertPost = async (newPost: NewPost) => {
  return db.insert(posts).values(newPost).returning();
}

