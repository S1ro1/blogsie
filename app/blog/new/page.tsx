"use client";

import {Input} from "@/components/ui/input";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'


export default function Page() {

  const [text, setText] = useState<string>('# Hi, *Pluto*!');

  return (
    <div className={"flex justify-center h-full"}>
      <form className={"flex flex-col w-[80%] items-center h-full gap-y-4"}>
        <Input type={"text"} placeholder={"Title"} className={"w-1/2"}/>
        <ResizablePanelGroup direction="horizontal" className={"h-full"}>
          <ResizablePanel>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} className={"h-full overflow-scroll p-5"}/>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Markdown
              remarkPlugins={[remarkGfm]}
              className={"markdown p-5"}/>
          </ResizablePanel>
        </ResizablePanelGroup>
      </form>
    </div>
  )
}