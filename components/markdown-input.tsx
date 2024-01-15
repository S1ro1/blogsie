import { ResizablePanel } from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { enableTab } from "@/lib/utils";

interface MarkdownInputProps {
  text: string;
  name: string;
  setText: (text: string) => void;
}

export const MarkdownInput = ({ text, name, setText }: MarkdownInputProps) => {
  return (
    <ResizablePanel defaultSize={50}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={enableTab}
        placeholder={"Write your blog here..."}
        className={"h-full overflow-scroll p-5"}
        name={name}
      />
    </ResizablePanel>
  );
};
