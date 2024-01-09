"use client";

import { Input } from "@/components/ui/input";
import React from "react";

export const BlogTitle = () => {
  const [title, setTitle] = React.useState<string>("");

  return (
    <div className={"flex flex-row text-left w-full items-center"}>
      <Input
        type={"text"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"Title..."}
        className={"w-1/2 text-2xl min-h-[52px]"}
        name={"title"}
      />
      <h1 className={"text-4xl mx-5"}>{title}</h1>
    </div>
  );
};
