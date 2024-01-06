"use server";

import {newUserSchema} from "@/lib/types";
import {db, insertUser} from "@/lib/db";
import {compare, hash} from "bcrypt";
import {users} from "@/lib/schema";
import {eq} from "drizzle-orm";

export async function registerUserAction(newUser: unknown) {
  const validatedUser = newUserSchema.safeParse(newUser);

  if (!validatedUser.success) {
    let error_message = "";

    validatedUser.error.issues.forEach((issue) => {
      error_message += issue.message + ". ";
    })

    return {
      error: error_message,
    }
  }

  const hashedPassword = await hash(validatedUser.data.password, 10);

  const user = await insertUser({
    email: validatedUser.data.email,
    password: hashedPassword
  });

  if (!user) {
    return {
      error: "Unable to register user",
    }
  }
}

export const login = async (email: string, password: string) => {
  const user = await db.select().from(users).limit(1).where(
    eq(users.email, email),
  );

  if (user.length > 0 && await compare(password, user[0].password)) {
    return user[0];
  } else {
    return null;
  }
}