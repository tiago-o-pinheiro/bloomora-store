"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants/constants";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME}`}
        width={48}
        height={48}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-destructive">
          Sorry, we couldn&#39;t find the page you&#39;re looking for.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => (window.location.href = "/")}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
