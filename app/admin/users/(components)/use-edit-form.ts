import { manageUserDetails } from "@/lib/actions/user/user.actions";
import { UserAdmin } from "@/lib/types/user.type";
import { updateProfileSchema } from "@/lib/validators/profile.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  image: "",
  role: "USER",
};

export const useEditUserForm = (id: string, user: UserAdmin) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: user || DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateProfileSchema>> = async (
    data
  ) => {
    try {
      const res = await manageUserDetails(id, data);
      if (!res.success) {
        toast.error(res.message || "Failed to update user.");
        return;
      }
      toast.success("User updated successfully!");
      router.push("/admin/users");
    } catch {
      toast.error("Error updating user.");
    }
  };

  const handleDeleteImage = async () => {
    const url = form.getValues("image");
    if (!url) {
      toast.info("No image to delete.");
      return;
    }

    try {
      const res = await fetch("/api/images/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        toast.error(json.error || "Failed to delete image.");
        return;
      }

      form.setValue("image", "", { shouldDirty: true, shouldTouch: true });
      toast.success("Image deleted.");
    } catch {
      toast.error("Unexpected error deleting image.");
    }
  };

  return { form, onSubmit, handleDeleteImage };
};
