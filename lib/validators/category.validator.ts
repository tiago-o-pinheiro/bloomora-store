import z from "zod";

export const insertCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(60, "Name must be at most 60 characters long"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use only lowercase letters, numbers and hyphens"
    ),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z.url().optional(),
});

export const updateCategorySchema = insertCategorySchema
  .partial()
  .extend({ id: z.uuid("Invalid category id") });
