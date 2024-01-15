import { PostCard } from "./post-card";
import { fetchPosts } from "@/lib/db";

export async function PostCardList() {
  const posts = await fetchPosts();
  return (
    <>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.title}
            title={post.title}
            email={post.author.email}
            firstName={post.author.firstName || ""}
            lastName={post.author.lastName || ""}
            description={post.description || ""}
          />
        );
      })}
    </>
  );
}
