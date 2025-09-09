import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCart } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "../user-button/UserButton";

const navItems = [{ href: "/cart", label: "Cart", icon: ShoppingCart }];

const NavItems = () => (
  <>
    <ThemeSwitcher />
    {navItems.map(({ href, label, icon: Icon }) => (
      <Button asChild variant="ghost" key={href}>
        <Link href={href} className="flex items-center">
          <Icon /> {label}
        </Link>
      </Button>
    ))}
    <UserButton />
  </>
);

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <NavItems />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            <NavItems />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
