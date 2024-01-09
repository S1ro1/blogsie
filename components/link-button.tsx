import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LinkButton = ({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) => {
  return (
    <Button variant={"link"} className={className}>
      <Link href={href}>{text}</Link>
    </Button>
  );
};
