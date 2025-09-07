import z from "zod";
import { cartItemSchema } from "../validators/cart.validator";

export type Item = z.infer<typeof cartItemSchema> & {
  stock?: number;
};
