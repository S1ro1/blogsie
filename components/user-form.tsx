"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {User} from "next-auth";
import React, {useState} from "react";

interface UserFormProps {
  user: User;
}

export function UserForm({user}: UserFormProps) {
  const [img, setImg] = useState<string | null>(null);

  const {image, email, firstName, lastName} = user;
  if (!email) {
    // TODO: Handle this case, but shouldn't ever happen
    return null;
  }

  const imageLink = image || "";
  let initials = email.substring(0, 2).toUpperCase();
  if (firstName && lastName) {
    initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  const icon = () => {
    if (img) {
      return (
        <>
          <AvatarImage src={img}/>
          <AvatarFallback>{initials}</AvatarFallback>
        </>
      )
    }
    if (imageLink) {
      return (
        <>
          <AvatarImage src={`/api/image/download?url=${imageLink}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </>
      )
    }

    return (
      <AvatarFallback>{initials}</AvatarFallback>
    )
  }

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setImg(newImage); // Data URL of the image
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <form>
      <div className={"relative overflow-hidden rounded-b-full w-24 mx-auto"}>
        <Label
          className={"absolute bottom-0 left-1/2 translate-x-[-50%] w-24 h-8 bg-slate-300 opacity-60 rounded-b-full z-50 hover:opacity-80 cursor-pointer transition-opacity"}>
          <Input className={"hidden"} type={"file"} name={"image"} onChange={changeAvatar}/>
          <svg xmlns={"http://www.w3.org/2000/svg"} width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="#000000" strokeWidth="2.657142857142857" strokeLinejoin="round"
               className={"lucide lucide-pencil-line mx-auto my-2"}>
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            <path d="m15 5 3 3"/>
          </svg>
        </Label>
        <Avatar className={"w-24 h-24 mx-auto"}>
          {icon()}
        </Avatar>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label>Email</Label>
          <Input id="email" placeholder={"Enter your email"} value={email} name={"email"}/>
        </div>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"first-name"}>First Name</Label>
          <Input id={"first-name"} name={"first-name"} placeholder={"Enter your first name"} value={firstName}/>
        </div>
      </div>
      <div className={"space-y-4 pt-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"last-name"}>Last Name</Label>
          <Input id={"last-name"} name={"last-name"} placeholder={"Enter your last name"} value={lastName}/>
        </div>
      </div>
      <Button className={"w-full mt-6"} type={"submit"}>
        Save changes
      </Button>
    </form>
  )
}