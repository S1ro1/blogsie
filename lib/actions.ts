"use server";

import {newUserSchema} from "@/lib/types";
import {insertUser} from "@/lib/db";
import {redirect} from "next/navigation";
import {hash} from "bcrypt";

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