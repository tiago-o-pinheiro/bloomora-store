import z from "zod";
import {
  categoryLightSchema,
  insertCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";
import { Product } from "@prisma/client";

export type CategoryInput = z.infer<typeof insertCategorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;

export type Category = CategoryInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryLight = z.infer<typeof categoryLightSchema>;
export type CategoryExtended = Category & {
  _count: {
    products: number;
  };
  products?: Product[] | null;
};
