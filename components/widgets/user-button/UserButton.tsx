import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user/user.actions";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const SignOutButton = () => {
  return (
    <Button
      type="submit"
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
      onClick={signOutUser}
    >
      Sign Out
    </Button>
  );
};

const UserDetails = async () => {
  const session = await auth();
  const firstInitial = session?.user.name?.charAt(0).toUpperCase() ?? "U";
  if (!session) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 hover:opacity-80 transition-opacity">
              {firstInitial}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/user/orders" className="flex items-center">
              My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/profile" className="flex items-center">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 mb-1">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild className="w-full">
        <Link href="/sign-in" className="flex items-center">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  return <UserDetails />;
};

export default UserButton;
