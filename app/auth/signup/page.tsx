"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newUserSchema } from "@/lib/types";
import {registerUserAction} from "@/lib/actions";
import {showToast} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {LinkButton} from "@/components/link-button";


export default function Page() {
  const register = async (formData: FormData) => {
    const newUser = newUserSchema.safeParse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeatPassword") as string,
    })

    if (!newUser.success) {
      newUser.error.issues.forEach((issue) => {
        showToast(issue.message);
      })
      return;
    }

    const response = await registerUserAction(newUser.data);
    if (response?.error) {
      showToast(response.error);
    }
  }

  return (
    <div className={"flex justify-center p-4"}>
      <form className={"flex flex-col gap-y-5 lg:w-1/6 md:w-1/4 w-full"} action={register}>
        <Input type={"email"} placeholder={"Email"} name={"email"}/>
        <Input type={"password"} placeholder={"Password"} name={"password"}/>
        <Input type={"password"} placeholder={"Repeat Password"} name={"repeatPassword"}/>
        <Label>Already have an account? <LinkButton href={"/auth/signin"} text={"Login here!"}/></Label>
        <Button type={"submit"} variant={"outline"}>Sign In</Button>
      </form>
    </div>
    )

}