"use server";

import {
  editUserSchema,
  NewPost,
  newPostSchema,
  NewPostToTag,
  newUserSchema,
  UserType,
} from "@/lib/types";
import { db, insertPost, insertUser } from "@/lib/db";
import { compare, hash } from "bcrypt";
import { postsToTags, tags, users } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";
import { auth } from "@/auth";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const uploadToVercelBlob = async (file: File) => {
  const { url } = await put(file.name, file, {
    access: "public",
  });
  return url;
};

const deleteFromVercelBlob = async (url: string) => {
  await del(url);
};

export const getVercelBlob = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

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

export const newPostAction = async (newPost: NewPost) => {
  return await insertPost(newPost);
};

export const newTagsAction = async (postId: number, newTags: string[]) => {
  const insertPromise = db
    .insert(tags)
    .values(
      newTags.map((tag) => {
        return {
          name: tag,
        };
      }),
    )
    .onConflictDoNothing({
      target: tags.name,
    });

  const queryPromise = db.query.tags.findMany({
    where: inArray(tags.name, newTags),
  });

  const [_, insertedTags] = await Promise.all([insertPromise, queryPromise]);

  await db.insert(postsToTags).values(
    insertedTags.map((tag) => {
      return {
        postId: postId,
        tagId: tag.id,
      };
    }),
  );
};

export async function editUserAction(newUserData: FormData) {
  const validatedUserData = editUserSchema.safeParse({
    email: newUserData.get("email"),
    firstName: newUserData.get("firstName"),
    lastName: newUserData.get("lastName"),
    imageLink: newUserData.get("imageLink"),
  });

  if (!validatedUserData.success) {
    let error_message = "";
    validatedUserData.error.issues.forEach((issue) => {
      error_message += issue.message + ". ";
    });
    return {
      error: error_message,
    };
  }

  const session = await auth();
  if (!session) {
    return {
      error: "You must be logged in to edit your profile",
    };
  }
  if (!session.user) {
    return {
      error: "You must be logged in to edit your profile",
    };
  }

  let link = "";
  if (validatedUserData.data.imageLink?.type.startsWith("image")) {
    link = await uploadToVercelBlob(validatedUserData.data.imageLink as File);

    const oldUrl = await db.query.users.findFirst({
      columns: {
        image: true,
      },
      where: eq(users.id, parseInt(session.user.id)),
    });

    if (oldUrl?.image) {
      await deleteFromVercelBlob(oldUrl.image);
    }
  }

  try {
    const user = await db
      .update(users)
      .set({
        email: validatedUserData.data.email,
        firstName: validatedUserData.data.firstName,
        lastName: validatedUserData.data.lastName,
        image: link ? link : undefined,
      })
      .where(eq(users.id, parseInt(session.user.id)))
      .returning();
    return user[0] as UserType;
  } catch (e) {
    return {
      error: "Unable to edit profile",
    };
  }
}
