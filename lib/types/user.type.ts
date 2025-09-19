import z from "zod";
import { updateProfileSchema } from "../validators/profile.validator";

export type User = z.infer<typeof updateProfileSchema>;
export type UserAdmin = User & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
