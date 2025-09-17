import Container from "@/components/widgets/container/Container";
import MainNav from "@/components/widgets/main-nav/MainNav";
import Menu from "@/components/widgets/menu/Menu";
import { APP_NAME } from "@/lib/constants/constants";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    title: "Orders",
    href: "/user/orders",
  },
  {
    title: "Profile",
    href: "/user/profile",
  },
];

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex items-center h-16 px-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                height={40}
                width={40}
                alt={APP_NAME}
              />
            </Link>
            <MainNav className="mx-4" urlList={LINKS} />
            <div className="ml-auto items-center flex space-x-4">
              <Menu />
            </div>
          </div>
        </div>
        <Container className="space-y-4 p-8 pt-6 space-x-4 justify-center container mx-auto">
          {children}
        </Container>
      </div>
    </>
  );
}
