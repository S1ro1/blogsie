import {ResizablePanel} from "@/components/ui/resizable";
import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownPreviewProps {
  text: string;
}

export const MarkdownPreview = ({text}: MarkdownPreviewProps) => {
  return (
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
  )
}
