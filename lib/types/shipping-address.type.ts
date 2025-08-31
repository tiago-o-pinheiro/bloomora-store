import z from "zod";
import { shippingAddressValidator } from "../validators/shipping-address.validator";

export type ShippingAddress = z.infer<typeof shippingAddressValidator> & {
  id: string;
  userId: string;
};
