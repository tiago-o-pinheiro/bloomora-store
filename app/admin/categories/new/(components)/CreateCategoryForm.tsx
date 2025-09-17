"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormImageUpload from "@/components/ui/form-image-upload/FormImageUpload";
import FormInput from "@/components/ui/form-input/FormInput";
import { Category } from "@/lib/types/category.type";
import { Loader, PlusSquare } from "lucide-react";
import FormTextarea from "@/components/ui/form-textarea/FormTextarea";
import { useCategoryForm } from "./use-category-form";

const BUTTON_SUBMIT_LABEL = {
  create: "Create Category",
  update: "Update Category",
};

const CreateCategoryForm = ({
  type,
  category,
}: {
  type: "create" | "update";
  category?: Category;
}) => {
  const { form, isPending, onSubmit, handleGenerateSlug } = useCategoryForm(
    type,
    category || ({} as Category)
  );

  const image = form.watch("image");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Category Name"
            placeholder="Category Name"
            control={form.control}
            name="name"
          />
          <FormInput
            label="Slug"
            placeholder="Slug"
            control={form.control}
            name="slug"
          >
            <Button
              type="button"
              onClick={handleGenerateSlug}
              className="max-w-[150px] self-end"
            >
              Generate slug
            </Button>
          </FormInput>
        </div>
        <FormImageUpload
          label="Images"
          name="image"
          control={form.control}
          images={[image ?? ""]}
          handleImageUpload={(files) => {
            form.setValue("image", files[0]);
          }}
        />
        <FormTextarea
          label="Description"
          placeholder="Category Description"
          control={form.control}
          name="description"
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="w-full col-span-2"
          >
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <PlusSquare className="w-4 h-4" />
            )}{" "}
            {BUTTON_SUBMIT_LABEL[type]}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
