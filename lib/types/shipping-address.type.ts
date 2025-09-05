import z from "zod";
import { shippingAddressSchema } from "../validators/shipping-address.validator";

export type ShippingAddress = z.infer<typeof shippingAddressSchema> & {
  id: string;
  userId: string;
  lat: number | null;
  lng: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
