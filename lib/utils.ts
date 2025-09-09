import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

//convert prisma objects to plain JavaScript objects
export const convertToPlainObject = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export const formatNumber = (num: number): string => {
  return NUMBER_FORMATTER.format(num);
};

//format number with decimal places
export const formatProductPrice = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${(decimal || "0").padEnd(2, "0")}` : `${int}.00`;
};

//format errors
export const formatError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = Array.isArray(error.meta?.target)
        ? error.meta?.target[0]
        : "Field";

      return `${capitalize(target)} already exists.`;
    }
    return `Database error (${error.code}).`;
  }

  return "Unknown error.";
};

//capitalize function
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//parse zodErrors
export const parseZodErrors = (err: z.ZodError) => {
  const { fieldErrors, formErrors } = z.flattenError(err);
  return { fieldErrors, formErrors };
};

//round two decimal places
export const roundTwoDecimalPlaces = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export const formatCurrency = (amount: number | string): string => {
  return CURRENCY_FORMATTER.format(Number(amount)) ?? "";
};

export const formatId = (id: string): string => {
  return `..${id.substring(id.length - 6)}`;
};
