import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

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
    <Button variant={"link"} className={className} type={"button"} asChild>
      <Link href={href}>{text}</Link>
    </Button>
  );
};
