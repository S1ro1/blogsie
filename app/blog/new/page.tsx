"use client";

import {Input} from "@/components/ui/input";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {addBlogPostAction} from "@/lib/actions";
import { newPostSchema } from "@/lib/types";

import {useRouter} from "next/navigation";
import {showToast} from "@/lib/utils";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Page() {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const handleKeyDown = (e: any) => {
    if (e.key == "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start === null || end === null) {
        return;
      }

      textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
  }

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
        <div className={"flex flex-row text-left w-full items-center"}>
          <Input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDownCapture={handleKeyDown}
            placeholder={"Title..."}
            className={"w-1/2 text-2xl min-h-[52px]"}
            name={"title"}
          />
          <h1 className={"text-4xl mx-5"}>{title}</h1>
        </div>
        <ResizablePanelGroup direction="horizontal" className={"relative"}>
          <ResizablePanel defaultSize={50}>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"Write your blog here..."}
              className={"h-full overflow-scroll p-5"}
              name={"content"}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ScrollArea className={"h-full border"}>
              <Markdown
                remarkPlugins={[remarkGfm]}
                className={"markdown p-5"}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                        {String(children).replace(/\n$/, '') ? children : <span>&nbsp;</span>}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {text}
              </Markdown>
            </ScrollArea>
          </ResizablePanel>
          <Button className={"absolute bottom-0 right-0 m-5"} type={"submit"}>Post</Button>
        </ResizablePanelGroup>
      </form>
    </div>
  )
}