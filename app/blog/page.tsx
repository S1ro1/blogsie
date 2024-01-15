import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/db";
import { TagDisplay } from "@/components/popular-tag-list";

export default async function Page() {
  const blogPosts = await fetchPosts();

  const cards = blogPosts.map((post) => {
    return (
      <Card key={post.title}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {post.author.firstName || post.author.email.split("@")[0]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mt-4">{post.description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Read More</Button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <div
      key="1"
      className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:py-16 md:py-12"
    >
      <h1 className="text-4xl font-bold">Programming Blog Feed</h1>
      <div className="grid grid-cols-1 gap-6">{cards}</div>
      <TagDisplay posts={blogPosts} />
    </div>
  );
}
