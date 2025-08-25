"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpUser } from "@/lib/actions/user/user.actions";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormValidation } from "./hooks/use-form-validation.hook";

const SignUpButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isPending}
      variant="default"
    >
      {isPending ? "Submitting..." : "Sign Up"}
    </Button>
  );
};

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const { handleSubmit, handleChange, errors, isPending } =
    useFormValidation(action);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="input"
          autoComplete="name"
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name[0]}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="input"
          autoComplete="email"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email[0]}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password[0]}</p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword[0]}</p>
        )}
      </div>
      <div className="w-full">
        <SignUpButton isPending={isPending} />
      </div>
      {data && !data.success && (
        <div className="text-sm text-red-500">{data.message}</div>
      )}
      <div className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" target="_self" className="link">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
