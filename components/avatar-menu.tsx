import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link";

interface AvatarMenuProps {
    imageLink: string;
    initials: string | null;
    email: string;
}

interface MenuItems {
  name: string;
  href: string;
  shortcut: string;
}

const menuItems: MenuItems[] = [
  {
    name: "My Profile",
    href: "/profile",
    shortcut: "⇧⌘P",
  },
  {
    name: "Edit Profile",
    href: "/profile/edit",
    shortcut: "⌘E",
  },
  {
    name: "My Blogs",
    href: "/blog/me",
    shortcut: "⌘B",
  },
  {
    name: "Sign Out",
    href: "/api/auth/signout?callbackUrl=/",
    shortcut: "⌘L",
  }
]

export function AvatarMenu({ imageLink, email, initials }: AvatarMenuProps) {
  const shownInitials = initials || email.substring(0, 2).toUpperCase()

  const menuItemsList = menuItems.map(({ name, href, shortcut }) => {
    return (
      <Link key={name} href={href}>
      <DropdownMenuItem>
        {name}
        <DropdownMenuShortcut>
          {shortcut}
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      </Link>
    )
  })

  return (
    <Button variant="ghost">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={`/api/image/download?url=${imageLink}`} />
            <AvatarFallback>{shownInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menuItemsList}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  )
}
