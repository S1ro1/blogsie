"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {useEffect, useRef} from "react";
import {showToast} from "@/lib/utils";

export default function Page() {
  const params = useSearchParams();
  const showErrorToast = params.get("error");
  const showSuccessLoginToast = params.get("success");

  const shownToast = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (showErrorToast && !shownToast.current) {
        showToast("Invalid credentials");
        shownToast.current = true;
      }

      if (showSuccessLoginToast && !shownToast.current) {
        showToast("Login successful");
        shownToast.current = true;
      }
    }, 100)
    return () => {
      shownToast.current = false;
    }

  }, [showErrorToast, showSuccessLoginToast])

  const login = (formData: FormData) => {
    signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
    }).then(() => {})
  }

  return (
    <div className={"flex justify-center p-4"}>
      <form className={"flex flex-col gap-y-5 lg:w-1/6 md:w-1/4 w-full"} action={login}>
        <Input type={"email"} placeholder={"Email"} name={"email"}/>
        <Input type={"password"} placeholder={"Password"} name={"password"}/>
        <Button type={"submit"} variant={"outline"}>Sign In</Button>
      </form>
    </div>
  )
}