import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface Post {
  title: string;
  description: string;
}

export default function Featured({ posts }: { posts: Post[] }) {
  return <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Featured Posts</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => <Card key={post.title}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {post.description}
          </CardContent>
        </Card>)}

      </div>
    </div>
  </section>
}