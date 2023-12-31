import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 2048 }),
  likes: integer('likes').default(0),
});