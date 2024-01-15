"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { newPostAction, newTagsAction } from "@/lib/actions";
import { NewPost } from "@/lib/types";
import { usePostStore } from "@/stores/post";
import React, { useState } from "react";
import { showToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const post = usePostStore((state) => state.postData);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;
      setTags([...tags, value]);
      (e.target as HTMLInputElement).value = "";
    }
  };

  const createNewPost = async (formData: FormData) => {
    const newPost: NewPost = {
      authorId: Number(post?.authorId as string),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      text: post?.text as string,
    };

    const res = await newPostAction(newPost);
    if ("error" in res) {
      showToast("Could not create post");
      return;
    }

    let res2 = await newTagsAction(res[0].id, tags);

    showToast("Post created successfully");
    router.push("/blog");
  };

  return (
    <div className="flex flex-col gap-y-6 w-1/2 px-4">
      {post?.text}
      <h1 className="font-extrabold text-3xl tracking-tight">
        Help people see your blog by providing additional information
      </h1>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag) => (
          <Badge key={tag}>{`#${tag}`}</Badge>
        ))}
      </div>
      <form className="flex flex-col gap-y-4" action={createNewPost}>
        <Input type="text" placeholder="Title" name="title" />
        <Textarea
          placeholder="Tell us more about what is your blog about..."
          name="description"
          rows={10}
        />
        <Input
          type="text"
          placeholder="Write a tag and press enter"
          name="tags"
          onKeyDown={handleSubmit}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}
