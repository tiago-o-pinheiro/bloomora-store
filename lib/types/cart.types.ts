import z from "zod";
import { insertCartSchema } from "../validators/cart.validator";

export type Cart = z.infer<typeof insertCartSchema> & {
  id: string;
};
