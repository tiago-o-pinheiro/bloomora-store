import z from "zod";
import { PAYMENT_METHODS } from "../constants/constants";

export const paymentMethodSchema = z.object({
  type: z.enum(PAYMENT_METHODS, "Payment method is required"),
});
