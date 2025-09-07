"use server";

import { CredentialsSchema } from "@/lib/validators/credentials.valitador";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signUpSchema } from "@/lib/validators/sign-up.valitador";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import { PaymentMethods } from "@/lib/types/payment-methods.types";
import { auth } from "@/auth";
import { paymentMethodSchema } from "@/lib/validators/payment-methods.validator";

export const getSessionUser = async () => {
  const session = await auth();
  return session?.user || null;
};

export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = CredentialsSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
};

export const signOutUser = async () => {
  await signOut();
  return {
    success: true,
    message: "Sign out successful",
  };
};

export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User registration successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: formatError(error),
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    user.password = null;

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};

export const updateUserPaymentMethod = async (data: PaymentMethods) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const paymentMethod = paymentMethodSchema.parse(data);

    const user = await prisma.user.update({
      where: { id: sessionUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    user.password = null;

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};
