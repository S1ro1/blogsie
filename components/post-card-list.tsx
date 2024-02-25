"use server";

import { PostCard } from "./post-card";
import { fetchPosts } from "@/lib/db";

type PostCardListProps = {
  currentPage: number;
};

export async function PostCardList({ currentPage }: PostCardListProps) {
  const posts = await fetchPosts();

  return (
    <div className="flex flex-col space-y-5">
      {currentPage}
      {posts.map((post) => {
        return (
          <PostCard
            key={post.title}
            title={post.title}
            email={post.author.email}
            firstName={post.author.firstName || ""}
            lastName={post.author.lastName || ""}
            description={post.description || ""}
            tags={post.postToTags.map((postToTag) => postToTag.tag.name)}
          />
        );
      })}
    </div>
  );
}
