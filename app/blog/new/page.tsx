"use client";

import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {addBlogPostAction} from "@/lib/actions";
import { newPostSchema } from "@/lib/types";

import {useRouter} from "next/navigation";
import {showToast} from "@/lib/utils";

import {BlogTitle} from "@/components/blog-title";
import {MarkdownInput} from "@/components/markdown-input";
import {MarkdownPreview} from "@/components/markdown-preview";

export default function Page() {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const insertPost = async (formData: FormData) => {
    const newPost = newPostSchema.safeParse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    })

    if (!newPost.success) {
      newPost.error.issues.forEach((issue) => {
        showToast(issue.message);
      })
      return;
    }
    // TODO: Maybe do a server validation before returning and show all the errors
    const response = await addBlogPostAction(newPost.data);
    if (response?.error) {
      showToast(response.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className={"flex justify-center h-[90vh]"}>
      <form className={"flex flex-col w-[80%] items-start gap-y-4 h-[90%]"} action={insertPost}>
        <BlogTitle />
        <ResizablePanelGroup direction="horizontal" className={"relative"}>
          <MarkdownInput text={text} setText={setText} />
          <ResizableHandle withHandle />
          <MarkdownPreview text={text} />
          <Button className={"absolute bottom-0 right-0 m-5"} type={"submit"}>Post</Button>
        </ResizablePanelGroup>
      </form>
    </div>
  )
}