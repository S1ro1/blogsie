import { auth } from "@/auth";
import { AvatarMenu } from "@/components/avatar-menu";
import { Blogsie } from "@/components/blogsie";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

export const NavBar = async () => {
  const session = await auth();

  const imageLink = session?.user?.image || "";
  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || null;
  const email = session?.user?.email;

  const navigationItems = (
    <>
      <Button variant={"ghost"} asChild>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button variant={"ghost"} asChild>
        <Link href={"/blog"}>Feed</Link>
      </Button>
      {session && (
        <>
          <Button variant={"ghost"} asChild>
            <Link href={"/blog/me"}>My Blogs</Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href={"/blog/new/start"}>New Blog</Link>
          </Button>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="m-4">
          <Link href="/">
            <Blogsie className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-5 m-4">
          {navigationItems}
        </div>
        <div className="flex flex-row items-center gap-5 m-4">
          <ThemeToggle />
          {session ? (
            <AvatarMenu
              imageLink={imageLink}
              email={email as string}
              initials={initials}
            />
          ) : (
            <Button variant={"ghost"}>
              <Link href={"/auth/signup"}>Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
};
