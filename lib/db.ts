import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql as psql } from "@vercel/postgres";

import * as schema from "./schema";
import { posts, postsToTags, tags, users, usersToLikedPosts } from "./schema";
import {
  NewPost,
  NewPostToTag,
  NewTag,
  NewUser,
  NewUserToLikedPost,
} from "@/lib/types";
import { count } from "drizzle-orm";

export const db = drizzle(psql, { schema });

export const insertPost = async (newPost: NewPost) => {
  return db.insert(posts).values(newPost).returning();
};

export const insertUser = async (newUser: NewUser) => {
  return db.insert(users).values(newUser).returning();
};

export const insertTag = async (newTag: NewTag) => {
  return db.insert(tags).values(newTag).returning();
};

// M:N
// -------------------------------------------------
export const insertUserToLikedPost = async (
  newUserToLikedPost: NewUserToLikedPost,
) => {
  return db.insert(usersToLikedPosts).values(newUserToLikedPost).returning();
};

export const insertPostToTag = async (newPostToTag: NewPostToTag) => {
  return db.insert(postsToTags).values(newPostToTag).returning();
};

// Fetching data
// -------------------------------------------------

export const fetchPosts = async (
  offset: number = 0,
  limit: number | undefined = undefined,
) => {
  return db.query.posts.findMany({
    offset: offset,
    ...(limit !== undefined ? { limit: limit } : {}),
    with: {
      author: true,
      userToLikedPosts: true,
      postToTags: {
        with: {
          tag: true,
        },
      },
    },
  });
};

export const getPostCount = async () => {
  const postCount = await db.select({ value: count(posts.id) }).from(posts);
  return postCount[0]["value"];
};
