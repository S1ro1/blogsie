import {integer, pgTable, primaryKey, serial, text} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  image: text("image"),
})

export const userRelations = relations(users, ({many}) => ({
  posts: many(posts),
  userToLikedPosts: many(usersToLikedPosts)
}))

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  authorId: integer('author_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
});

export const postRelations = relations(posts, ({one, many}) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  userToLikedPosts: many(usersToLikedPosts)
}))

export const usersToLikedPosts = pgTable('user_to_liked_posts', {
  userId: integer('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}), //TODO: Check if this doesn't break something
  postId: integer('post_id').notNull().references(() => posts.id, {onDelete: 'cascade'}),
}, (t) => ({
  pk: primaryKey({columns: [t.userId, t.postId]}),
}))

export const usersToLikedPostsRelations = relations(usersToLikedPosts, ({one}) => ({
  post: one(posts, {
    fields: [usersToLikedPosts.postId],
    references: [posts.id]
  }),
  user: one(users, {
    fields: [usersToLikedPosts.userId],
    references: [users.id]
  })
}))