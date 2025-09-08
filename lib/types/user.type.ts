import z from "zod";
import { updateProfileSchema } from "../validators/profile.validator";

export type User = z.infer<typeof updateProfileSchema>;
