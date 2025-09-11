import { z } from "zod";
import { formatProductPrice } from "../utils";
import { categoryIdsSchema, categoryLightSchema } from "./category.validator";

export const currency = z
  .string()
  .refine((val) => /^\d+(\.\d{2})?$/.test(formatProductPrice(Number(val))), {
    message: "Invalid price format",
  });

//Schema for inserting products

export const insertProductSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  categoryIds: categoryIdsSchema.nullable().optional(),
  brand: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  images: z.array(z.string()).min(1).max(5),
  isFeatured: z.boolean(),
  price: currency,
  numReviews: z.number().min(0),
  stock: z.coerce.number().min(0),
  banner: z.string().nullable(),
});

export const updateProductSchema = insertProductSchema
  .partial()
  .extend({
    id: z.uuid("Invalid product id"),
    categoryIds: z.union([categoryIdsSchema, z.null()]).optional(),
  })
  .refine((data) => Object.keys(data).some((k) => k !== "id"), {
    message: "Provide at least one field to update",
  });

export const productViewSchema = insertProductSchema.extend({
  id: z.uuid(),
  rating: z.string(),
  createdAt: z.date(),
  price: z.union([z.number(), z.string()]),
  categories: z.array(categoryLightSchema).optional().nullable(),
});
