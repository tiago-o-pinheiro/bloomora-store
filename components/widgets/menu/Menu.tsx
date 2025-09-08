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
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ThemeSwitcher />
            <Button asChild variant={"ghost"}>
              <Link href="/cart" className="flex items-center">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <UserButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
