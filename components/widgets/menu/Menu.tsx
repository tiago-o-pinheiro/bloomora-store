import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCart, UserIcon } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeSwitcher />
        <Button asChild variant={"ghost"}>
          <Link href="/cart" className="flex items-center">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in" className="flex items-center">
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            <ThemeSwitcher />
            <Button asChild variant={"ghost"}>
              <Link href="/cart" className="flex items-center">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in" className="flex items-center">
                <UserIcon /> Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
