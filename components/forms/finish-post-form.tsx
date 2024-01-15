"use client";

import { newPostAction, newTagsAction } from "@/lib/actions";
import { NewPost } from "@/lib/types";
import { showToast } from "@/lib/utils";
import { usePostStore } from "@/stores/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { TagList } from "../tag-list";

export function FinishPostForm() {
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
    <>
      <TagList tags={tags} />
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
    </>
  );
}
