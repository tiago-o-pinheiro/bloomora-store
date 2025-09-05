import z from "zod";
import { paymentMethodSchema } from "../validators/payment-methods.validator";

export type PaymentMethods = z.infer<typeof paymentMethodSchema>;
