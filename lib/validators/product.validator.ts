import { z } from "zod";
import { formatNumber } from "../utils";

const currency = z
  .string()
  .refine((val) => /^\d+(\.\d{2})?$/.test(formatNumber(Number(val))), {
    message: "Invalid price format",
  });

//Schema for inserting products

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(100),
  slug: z.string().min(3, "Slug must be at least 3 characters long").max(100),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters long")
    .max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000),
  brand: z.string().min(3, "Brand must be at least 3 characters long").max(100),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5, "A maximum of 5 images is allowed"),
  price: currency,
  numReviews: z.number().min(0),
  stock: z.coerce.number().min(0),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});
