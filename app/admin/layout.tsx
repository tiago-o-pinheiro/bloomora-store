import { Input } from "@/components/ui/input";
import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import MainNav from "@/components/widgets/main-nav/MainNav";
import Menu from "@/components/widgets/menu/Menu";
import ProtectedResource from "@/components/widgets/protected-resource/ProtectedResource";
import { APP_NAME } from "@/lib/constants/constants";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
];

const SearchBar = () => {
  return (
    <div>
      <Input
        placeholder="Search..."
        type="search"
        className="md:w-[300px] w-[100px]"
      />
    </div>
  );
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedResource shouldRedirect>
      <div className="flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex items-center h-16 px-4">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                height={40}
                width={40}
                alt={APP_NAME}
              />
            </Link>
            <MainNav className="mx-4" urlList={LINKS} />
            <div className="ml-auto items-center flex space-x-4">
              <SearchBar />
              <Menu />
            </div>
          </div>
        </div>
        <AnimatedContainer className="space-y-4 p-8 pt-6 space-x-4 justify-center container mx-auto">
          {children}
        </AnimatedContainer>
      </div>
    </ProtectedResource>
  );
}
