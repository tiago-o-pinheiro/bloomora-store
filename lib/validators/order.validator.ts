import z from "zod";
import { currency } from "./product.validator";
import { PAYMENT_METHODS } from "../constants/constants";

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Payment Method is required",
  }),
  shippingAddressId: z.uuid("Shipping address id is required"),
  status: z.string().default("PENDING"),
});

export const insertOrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1).max(100),
  image: z.url(),
  name: z.string().min(1, "Product name is required"),
  price: currency,
  total: currency.optional(),
  slug: z.string().min(1).max(100),
});
