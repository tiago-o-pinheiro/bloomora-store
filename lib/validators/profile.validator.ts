import z from "zod";

import { roles } from "../types/roles.type";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .nullish(),
  email: z.email("Invalid email address"),
  image: z.string("Invalid image URL").nullable(),
  role: z
    .string()
    .refine(
      (val) => (val ? (roles as readonly string[]).includes(val) : true),
      {
        message: "Invalid role",
      }
    ),
});
