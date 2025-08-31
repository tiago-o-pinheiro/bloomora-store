import z from "zod";

export const shippingAddressValidator = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100),
  addressLine1: z
    .string()
    .min(5, "Address line 1 must be at least 5 characters long")
    .max(200),
  addressLine2: z
    .string()
    .min(5, "Address line 2 must be at least 5 characters long")
    .max(200)
    .optional(),
  city: z.string().min(2, "City must be at least 2 characters long").max(100),
  state: z.string().min(2, "State must be at least 2 characters long").max(100),
  postalCode: z
    .string()
    .min(5, "Postal code must be at least 5 characters long")
    .max(20),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters long")
    .max(100),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
});
