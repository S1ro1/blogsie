import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Featured from "@/components/featured";
import Image from "next/image";

interface Posts {
  title: string;
  description: string;
}

const featuredPosts: Posts[] = [
  {
    title: "The Art of Storytelling",
    description: "Discover the secrets behind creating compelling narratives that capture the imagination."
  },
  {
    title: "Understanding Character Development",
    description: "Dive into the complex world of character development and learn how to create memorable characters."
  },
  {
    title: "The Power of Visual Storytelling",
    description: "Explore how visual elements can enhance storytelling and engage audiences in unique ways."
  }
];


export function Landing() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center">
      <header className="px-4 lg:px-6 h-14 flex justify-between items-center w-full">
        <Link className="flex items-center justify-center" href="#">
          <BookOpenIcon className="h-6 w-6" />
          <span className="ml-2 text-xl font-semibold">Blogsie</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Blogsie
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover, read and share compelling stories from around the world.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                  href="#"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="mt-20">
              <Image
                alt="Hero image"
                className="mx-auto w-full h-[300px] object-cover rounded-xl"
                height="300"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "900/300",
                  objectFit: "cover",
                }}
                width="900"
              />
            </div>
          </div>
        </section>
        <Featured posts={featuredPosts} />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Subscribe to Our Newsletter</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
              Get the latest updates and blog posts delivered straight to your inbox.
            </p>
            <form className="mt-8 flex justify-center">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button className="ml-4" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© Blogsie. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}


function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
