"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/widgets/container/Container";
import { APP_NAME } from "@/lib/constants/constants";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
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
          <h1 className="text-2xl font-bold">404 - Not Found</h1>
          <p className="text-center text-destructive">
            Sorry, we couldn&#39;t find the page you&#39;re looking for.
          </p>

          <Link href="/" className="mt-4">
            <Button variant="outline">Go to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFound;
