"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input/FormInput";
import { updateUserProfile } from "@/lib/actions/user/user.actions";
import { User } from "@/lib/types/user.type";
import { updateProfileSchema } from "@/lib/validators/profile.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfileForm = () => {
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();

  const form = useForm<User>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user.name ?? "",
      email: session?.user.email ?? "",
    },
  });

  const onSubmit = async (data: User) => {
    startTransition(async () => {
      const response = await updateUserProfile(data);

      if (!response.success) {
        toast.error("Failed to update profile");
      }

      toast.success("Profile updated successfully");
      update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
        },
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="name"
          label="Name"
          placeholder="Enter your name"
          control={form.control}
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          control={form.control}
          disabled
        />
        <Button
          type="submit"
          disabled={isPending || form.formState.isSubmitting}
        >
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
