import z from "zod";
import {
  insertCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

export type CategoryInput = z.infer<typeof insertCategorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;

export type Category = CategoryInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
