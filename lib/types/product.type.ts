import { z } from "zod";
import {
  insertProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { CategoryLight } from "./category.type";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
  price: number | string;
  categories?: CategoryLight[] | null;
};
export type ProductInput = z.infer<typeof insertProductSchema>;
export type ProductUpdateInput = z.infer<typeof updateProductSchema>;
