import { z } from "zod";
import { formatProductPrice } from "../utils";

export const currency = z
  .string()
  .refine((val) => /^\d+(\.\d{2})?$/.test(formatProductPrice(Number(val))), {
    message: "Invalid price format",
  });

//Schema for inserting products

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(100),
  slug: z.string().min(3, "Slug must be at least 3 characters long").max(100),
  categoryId: z.uuid("Invalid category id"),
  brand: z.string().min(3, "Brand must be at least 3 characters long").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5, "A maximum of 5 images is allowed"),
  isFeatured: z.boolean(),
  price: currency,
  numReviews: z.number().min(0),
  stock: z.coerce.number().min(0),
  banner: z.string().nullable(),
});

export const updateProductSchema = insertProductSchema
  .partial()
  .extend({ id: z.uuid("Invalid product id") });
