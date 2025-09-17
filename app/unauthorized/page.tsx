import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/widgets/container/Container";
import { APP_NAME } from "@/lib/constants/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unauthorized Access",
  description: "You do not have permission to view this page.",
};

const UnauthorizedPage = () => {
  return (
    <Container className="container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)]">
      <Card>
        <CardHeader className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt={`${APP_NAME}`}
            width={48}
            height={48}
            priority={true}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">
            You do not have permission to view this page.
          </h1>
          <p className="text-center text-muted-foreground">
            If you believe this is an error, please contact support.
          </p>

          <Link href="/" className="mt-4">
            <Button variant="outline">Go to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UnauthorizedPage;
