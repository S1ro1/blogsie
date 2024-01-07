"use client";

import {Input} from "@/components/ui/input";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {ScrollArea} from "@/components/ui/scroll-area";


export default function Page() {

  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");


  return (
    <div className={"flex justify-center h-[90vh]"}>
      <form className={"flex flex-col w-[80%] items-start h-full gap-y-4 min-h-full"}>
        <div className={"flex flex-row text-left w-full items-center"}>
          <Input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Title..."}
            className={"w-1/2 text-2xl min-h-[52px]"}
          />
          <h1 className={"text-4xl mx-5"}>{title}</h1>
        </div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Write your blog here..."}
              className={"h-full overflow-scroll p-5"}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ScrollArea className={"h-full border"}>
              <Markdown remarkPlugins={[remarkGfm]} className={"markdown p-5 overflow-scroll"}>{text}</Markdown>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </form>
    </div>
  )
}