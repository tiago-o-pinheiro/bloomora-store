import { z } from "zod";
import { insertProductSchema } from "../validators/product.validator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: string;
};
