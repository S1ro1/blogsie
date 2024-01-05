import {Blogsie} from "@/components/blogsie";
import {ThemeToggle} from "@/components/theme-toggle";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {auth} from "@/auth";


export const NavBar = async () => {
  const session = await auth();

  return <div className="fixed top-0 left-0 w-full z-50 flex justify-between">
    <div className="m-4">
      <Link href="/">
        <Blogsie className="w-8 h-8" />
      </Link>
    </div>
    <div className="flex flex-row items-center gap-5 m-4">
      <Button variant="ghost">
        <Link href="/about">About</Link>
      </Button>
      <Button variant="ghost">
        {session ? <Link href={"/api/auth/signout?callbackUrl=/"}>Sign Out</Link> : <Link href={"/auth/signup"}>Sign Up</Link>}
      </Button>
      <ThemeToggle/>
    </div>
  </div>;
};
