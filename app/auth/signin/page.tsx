"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {useEffect, useRef} from "react";
import {showToast} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {LinkButton} from "@/components/link-button";

export default function Page() {
  const params = useSearchParams();
  const showErrorToast = params.get("error");
  const showSucessRegistrationToast = params.get("success");

  const shownToast = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (showErrorToast && !shownToast.current) {
        showToast("Invalid credentials");
        shownToast.current = true;
      }

      if (showSucessRegistrationToast && !shownToast.current) {
        showToast("Registration successful");
        shownToast.current = true;
      }
    }, 100)
    return () => {
      shownToast.current = false;
    }
  }, [showErrorToast, showSucessRegistrationToast])

  const login = (formData: FormData) => {
    signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
    }).then(() => {})
  }

  return (
    <div className={"flex justify-center p-4"}>
      <form className={"flex flex-col gap-y-5 lg:w-1/5 md:w-1/2 w-[80%]"} action={login}>
        <Input type={"email"} placeholder={"Email"} name={"email"}/>
        <Input type={"password"} placeholder={"Password"} name={"password"}/>
        <div className={"w-full"}>
          <Label className={"font-light text-xs"}>{"Don't have an account yet? "}<LinkButton href={"/auth/signup"} text={"Register here!"} className={"font-medium text-xs"}/></Label>
          <Button type={"submit"} variant={"outline"} className={"w-full"}>Sign In</Button>
        </div>
      </form>
    </div>
  )
}