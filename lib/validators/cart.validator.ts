import z from "zod";
import { currency } from "./product.validator";

export const cartItemSchema = z.object({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Product slug is required"),
  quantity: z
    .number()
    .int()
    .min(1, "Product quantity must be a positive number"),
  image: z.string().min(1, "Product image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
