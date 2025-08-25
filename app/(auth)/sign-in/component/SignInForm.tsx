"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithCredentials } from "@/lib/actions/user/user.actions";
import { useSearchParams } from "next/navigation";

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={pending}
      variant="default"
    >
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
};

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form className="space-y-4" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="input"
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="input"
        />
      </div>
      <div className="w-full">
        <SignInButton />
      </div>
      {data && !data.success && (
        <div className="text-sm text-red-500">{data.message}</div>
      )}
      <div className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" target="_self" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
