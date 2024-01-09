import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Users
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  image: text("image"),
});

/**
 * Relations for users
 */
export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  userToLikedPosts: many(usersToLikedPosts),
}));

/**
 * Tags for blog posts
 */
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

/**
 * Relations for tags
 */
export const tagRelations = relations(tags, ({ many }) => ({
  postToTags: many(postsToTags), // post M:N
}));

/**
 * Blog posts
 */
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

/**
 * Relations for blog posts
 */
export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  userToLikedPosts: many(usersToLikedPosts), // likes M:N

  postToTags: many(postsToTags), // tags M:N
}));

/**
 * Intermediate table for M:N relation between users and their liked posts
 */
export const usersToLikedPosts = pgTable(
  "user_to_liked_posts",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), //TODO: Check if this doesn't break something
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.postId] }),
  }),
);

/**
 * Relations for M:N relation between users and their liked posts
 */
export const usersToLikedPostsRelations = relations(
  usersToLikedPosts,
  ({ one }) => ({
    post: one(posts, {
      fields: [usersToLikedPosts.postId],
      references: [posts.id],
    }),
    user: one(users, {
      fields: [usersToLikedPosts.userId],
      references: [users.id],
    }),
  }),
);

/**
 * Intermediate table for M:N relation between posts and their tags
 */
export const postsToTags = pgTable(
  "post_to_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagId] }),
  }),
);

/**
 * Relations for M:N relation between posts and their tags
 */
export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id],
  }),
}));
