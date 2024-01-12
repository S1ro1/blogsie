"use client";

import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { addBlogPostAction } from "@/lib/actions";
import { newPostSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/utils";
import { BlogTitle } from "@/components/blog-title";
import { MarkdownInput } from "@/components/markdown-input";
import { MarkdownPreview } from "@/components/markdown-preview";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export default function Page() {
  const [rawMarkdown, setRawMarkdown] = useState<string>("");
  const router = useRouter();

  const createPost = async (formData: FormData) => {
    const newPost = newPostSchema.safeParse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    });

    if (!newPost.success) {
      newPost.error.issues.forEach((issue) => {
        showToast(issue.message);
      });
      return;
    }

    const response = await addBlogPostAction(newPost.data);
    if (response?.error) {
      showToast(response.error);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <h1 className={"text-4xl font-bold mx-[10%] py-8"}>Share your thoughts...</h1>
      <div className={"flex justify-center h-[90vh]"}>
        <form
          className={"flex flex-col w-[80%] items-start gap-y-4 h-[80%]"}
          action={createPost}
        >
          <ResizablePanelGroup direction="horizontal" className={"relative"}>
            <MarkdownInput text={rawMarkdown} setText={setRawMarkdown} />
            <ResizableHandle withHandle />
            <MarkdownPreview text={rawMarkdown} />
            <Button className={"absolute bottom-0 right-0 m-5"} type={"submit"}>
              Finish
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </ResizablePanelGroup>
        </form>
      </div>
    </>
  );
}
