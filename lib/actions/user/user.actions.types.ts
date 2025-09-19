import { Meta } from "@/lib/types/meta.type";
import { UserAdmin } from "@/lib/types/user.type";

export type GetAllUsers = {
  success: boolean;
  data: UserAdmin[];
  meta?: Meta;
  message?: string;
};
