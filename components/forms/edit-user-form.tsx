"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { editUserSchema } from "@/lib/types";
import { showToast } from "@/lib/utils";
import { editUserAction } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className={"w-full mt-6"} type={"submit"} disabled={pending}>
      {pending ? <ReloadIcon className={"animate-spin mr-2"} /> : null}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function EditUserForm() {
  const [img, setImg] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    return null;
  }
  const user = session.user;

  if (!user.email) {
    return null; // should never happen
  }
  const { image, email, firstName, lastName } = user;
  const imageLink = image || "";
  let initials = email.substring(0, 2).toUpperCase();
  if (firstName && lastName) {
    initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setImg(newImage); // Data URL of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const editUser = async (formData: FormData) => {
    const newUserData = editUserSchema.safeParse({
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      imageLink: formData.get("imageLink") as string,
    });

    if (!newUserData.success) {
      newUserData.error.issues.forEach((issue) => {
        showToast(issue.message);
      });
      return;
    }

    const response = await editUserAction(formData);
    if ("error" in response) {
      showToast(response.error);
    } else {
      if (session) {
        const newSession = await update({
          ...user,
          ...response,
        });
      }
      showToast("User updated successfully!");
      router.refresh();
    }
  };

  return (
    <form action={editUser}>
      <div className={"relative overflow-hidden rounded-b-full w-24 mx-auto"}>
        <Label
          className={
            "absolute bottom-0 left-1/2 translate-x-[-50%] w-24 h-8 bg-slate-300 opacity-60 rounded-b-full z-50 hover:opacity-80 cursor-pointer transition-opacity"
          }
        >
          <Input
            className={"hidden"}
            type={"file"}
            name={"imageLink"}
            onChange={changeAvatar}
          />
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.657142857142857"
            strokeLinejoin="round"
            className={"lucide lucide-pencil-line mx-auto my-2"}
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            <path d="m15 5 3 3" />
          </svg>
        </Label>
        <Avatar className={"w-24 h-24 mx-auto"}>
          {img ? (
            <AvatarImage src={img} />
          ) : imageLink ? (
            <AvatarImage src={`/api/image/download?url=${imageLink}`} />
          ) : (
            <></>
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label>Email</Label>
          <Input
            id="email"
            placeholder={"Enter your email"}
            defaultValue={email}
            name={"email"}
          />
        </div>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"first-name"}>First Name</Label>
          <Input
            id={"first-name"}
            name={"firstName"}
            placeholder={"Enter your first name"}
            defaultValue={firstName}
          />
        </div>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"last-name"}>Last Name</Label>
          <Input
            id={"last-name"}
            name={"lastName"}
            placeholder={"Enter your last name"}
            defaultValue={lastName}
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
