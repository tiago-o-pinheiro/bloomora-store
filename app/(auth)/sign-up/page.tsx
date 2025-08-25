import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./components/SignUpForm";
import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <AnimatedContainer className="w-full max-w-md mx-auto" animation="scale">
      <Card className="border-0 md:border">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
        </CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
        <CardDescription className="text-center py-2">
          Enter your details to create a new account on {APP_NAME}.
        </CardDescription>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default SignUpPage;
