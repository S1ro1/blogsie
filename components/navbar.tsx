import { Blogsie } from "@/components/blogsie";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { AvatarMenu } from "@/components/avatar-menu";

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
      <Button variant={"ghost"}>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button variant={"ghost"}>
        <Link href={"/blog"}>Feed</Link>
      </Button>
      {session && (
        <Button variant={"ghost"}>
          <Link href={"/blog/me"}>My Blogs</Link>
        </Button>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between">
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
  );
};
