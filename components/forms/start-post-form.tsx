"use client";

import { newPostSchema } from "@/lib/types";
import { showToast } from "@/lib/utils";
import { usePostStore } from "@/stores/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MarkdownInputForm } from "@/components/forms/markdown-input-form";
import { MarkdownPreview } from "@/components/markdown-preview";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface StartPostFormProps {
  authorId: string;
}

export const StartPostForm = ({ authorId }: StartPostFormProps) => {
  const [rawMarkdown, setRawMarkdown] = useState<string>("");
  const setPost = usePostStore((state) => state.setPost);
  const router = useRouter();

  const createPost = async (formData: FormData) => {
    const newPost = newPostSchema.safeParse({
      content: formData.get("blogContent") as string,
    });

    if (!newPost.success) {
      newPost.error.issues.forEach((issue) => {
        showToast(issue.message);
      });
      return;
    }

    const { content } = newPost.data;
    setPost(content, authorId);

    router.push("/blog/new/finish");
  };
  return (
    <div className={"flex justify-center h-[90vh]"}>
      <form
        className={"flex flex-col w-[80%] items-start gap-y-4 h-[80%]"}
        action={createPost}
      >
        <ResizablePanelGroup direction="horizontal" className={"relative"}>
          <MarkdownInputForm
            text={rawMarkdown}
            setText={setRawMarkdown}
            name={"blogContent"}
          />
          <ResizableHandle withHandle />
          <MarkdownPreview text={rawMarkdown} />
          <Button className={"absolute bottom-0 right-0 m-5"} type={"submit"}>
            Finalize
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </ResizablePanelGroup>
      </form>
    </div>
  );
};
