import "@/lib/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql as psql} from "@vercel/postgres";

import * as schema from "./schema"
import {posts, postsToTags, tags, users, usersToLikedPosts} from "./schema"
import {NewPost, NewPostToTag, NewTag, NewUser, NewUserToLikedPost} from "@/lib/types";

export const db = drizzle(psql, { schema});

export const insertPost = async (newPost: NewPost) => {
  return db.insert(posts).values(newPost).returning();
}

export const insertUser = async (newUser: NewUser) => {
  return db.insert(users).values(newUser).returning();
}

export const insertTag = async (newTag: NewTag) => {
  return db.insert(tags).values(newTag).returning();
}


// M:N
// -------------------------------------------------
export const insertUserToLikedPost = async (newUserToLikedPost: NewUserToLikedPost) => {
  return db.insert(usersToLikedPosts).values(newUserToLikedPost).returning();
}

export const insertPostToTag = async (newPostToTag: NewPostToTag) => {
  return db.insert(postsToTags).values(newPostToTag).returning();
}

// Fetching data
// -------------------------------------------------

export const fetchPosts = async () => {
  return db.query.posts.findMany({
    with: {
      author: true,
      userToLikedPosts: true,
      postToTags: {
        with: {
          tag: true
        }
      }
    }
  })
}
