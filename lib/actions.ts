"use server";

import {newUserSchema} from "@/lib/types";
import {insertUser, NewUser} from "@/lib/db";
import {redirect} from "next/navigation";

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

  const user = await insertUser(validatedUser.data as NewUser);

  if (!user) {
    return {
      error: "Unable to register user",
    }
  }

  redirect("/auth/signin?success=true");
}