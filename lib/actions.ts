"use server";

import { NewPost, newPostSchema, newUserSchema } from "@/lib/types";
import { db, insertPost, insertUser } from "@/lib/db";
import { compare, hash } from "bcrypt";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { PutBlobResult } from "@vercel/blob";

export const login = async (email: string, password: string) => {
  const user = await db
    .select()
    .from(users)
    .limit(1)
    .where(eq(users.email, email));

  if (user.length > 0 && (await compare(password, user[0].password))) {
    return user[0];
  } else {
    return null;
  }
};

export async function registerUserAction(newUser: unknown) {
  const validatedUser = newUserSchema.safeParse(newUser);

  if (!validatedUser.success) {
    let error_message = "";

    validatedUser.error.issues.forEach((issue) => {
      error_message += issue.message + ". ";
    });

    return {
      error: error_message,
    };
  }

  const hashedPassword = await hash(validatedUser.data.password, 10);

  const user = await insertUser({
    email: validatedUser.data.email,
    password: hashedPassword,
  });

  if (!user) {
    return {
      error: "Unable to register profile",
    };
  }
}

export const addBlogPostAction = async (newBlogPost: unknown) => {
  const validatedBlogPost = newPostSchema.safeParse(newBlogPost);

  if (!validatedBlogPost.success) {
    let error_message = "";
    validatedBlogPost.error.issues.forEach((issue) => {
      error_message += issue.message + ". ";
    });
    return {
      error: error_message,
    };
  }

  const session = await auth();
  if (!session) {
    return {
      error: "You must be logged in to add a blog post",
    };
  }
  if (!session.user) {
    return {
      error: "You must be logged in to add a blog post",
    };
  }

  let blogPost: NewPost;
  try {
    blogPost = {
      authorId: parseInt(session.user.id),
      title: validatedBlogPost.data.title,
      text: validatedBlogPost.data.content, //TODO
      description: validatedBlogPost.data.content,
    };
  } catch (e) {
    return {
      error: "Unable to add blog post",
    };
  }

  const newPost = await insertPost(blogPost);
  if (!newPost) {
    return {
      error: "Unable to add blog post",
    };
  }
};

export async function uploadFileAction(formData: FormData) {
  const file = formData.get("picture") as File;

  if (!file) {
    return null;
  }

  const response = await fetch(`http://localhost:3000/api/image/upload?filename=${file.name}`, {
    method: "POST",
    body: file,
  });

  return (await response.json()) as PutBlobResult;
}
