"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  title: string;
  href: string;
};

type MainNavProps = React.HTMLAttributes<HTMLElement> & {
  urlList: LinkType[];
};

const MainNav = ({ urlList, className, ...props }: MainNavProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {urlList.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.includes(link.href) ? "" : "text-muted-foreground"
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
