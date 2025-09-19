"use client";

import { UserAdmin } from "@/lib/types/user.type";
import { useEditUserForm } from "./use-edit-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input/FormInput";
import FormSelect from "@/components/ui/form-select/FormSelect";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, User } from "lucide-react";
import { UploadButton } from "@/components/widgets/upload-button/UploadButton";
import Link from "next/link";

const EditUserForm = ({ user }: { user: UserAdmin }) => {
  const { form, onSubmit, handleDeleteImage } = useEditUserForm(user.id, user);
  const image = form.watch("image");

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 flex flex-col gap-2 justify-center items-center">
            {image ? (
              <div className="flex flex-col gap-2 justify-center items-center">
                <Image
                  src={image}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-md w-[150px] h-[150px] object-cover"
                  objectFit="cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteImage}
                >
                  Delete image
                </Button>
              </div>
            ) : (
              <div>
                <UploadButton
                  className="mt-4 ut-button:bg-slate-950"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    const url = res?.[0]?.url;
                    if (url) form.setValue("image", url);
                  }}
                  onUploadError={(e: Error) => {
                    console.error(e);
                  }}
                />
              </div>
            )}
          </div>
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            <FormInput
              label="Email"
              placeholder="Email"
              control={form.control}
              name="email"
              disabled
            />
            <FormInput
              label="Name"
              placeholder="Name"
              control={form.control}
              name="name"
            />

            <FormSelect
              label="Role"
              control={form.control}
              options={[
                { value: "USER", label: "User" },
                { value: "ADMIN", label: "Admin" },
              ]}
              name="role"
            />
            <div className="grid grid-cols-2 gap-2 md:flex md:justify-end">
              <Button
                asChild
                className="w-full col-span-2"
                variant="outline"
                size="lg"
              >
                <Link href="/admin/users">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                size="lg"
                className="w-full col-span-2"
              >
                {form.formState.isSubmitting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <User className="w-4 h-4" />
                )}{" "}
                Update user
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditUserForm;
