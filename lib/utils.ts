import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//convert prisma objects to plain JavaScript objects
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

//format number with decimal places
export function formatNumber(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${(decimal || "0").padEnd(2, "0")}` : `${int}.00`;
}
