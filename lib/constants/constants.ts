export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT) || 10;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Art Store";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A place to find and purchase art.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS?.split(",") || [
  "PayPal",
  "Stripe",
  "Credit Card",
];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "Credit Card";
export const PAGE_SIZE = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 2;
