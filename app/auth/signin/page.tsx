"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";

export default function Page() {
  const params = useSearchParams();
  const showToast = params.get("error");

  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      if (showToast) {
        toast({
          variant: "destructive",
          description: "Invalid email or password",
        })
      }
    }, 100)
  }, [toast, showToast])

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