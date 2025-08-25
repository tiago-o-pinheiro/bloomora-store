import z from "zod";
import { cartItemValidator } from "../validators/cart.validator";

export type Item = z.infer<typeof cartItemValidator>;
