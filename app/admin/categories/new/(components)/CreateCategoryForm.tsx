"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormImageUpload from "@/components/ui/form-image-upload/FormImageUpload";
import FormInput from "@/components/ui/form-input/FormInput";
import { sluguify } from "@/lib/helpers/sluguify";
import { CategoryInput } from "@/lib/types/category.type";
import { insertCategorySchema } from "@/lib/validators/category.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { createCategory } from "@/lib/actions/category/category.actions";
import { useRouter } from "next/navigation";
import { Loader, PlusSquare } from "lucide-react";

type CategoryFormValues = z.infer<typeof insertCategorySchema>;

const DEFAULT_CATEGORY: CategoryInput = {
  name: "",
  description: "",
  image: "",
  slug: "",
};

const CreateCategoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: DEFAULT_CATEGORY,
  });

  const image = form.watch("image");

  const handleGenerateSlug = () => {
    form.setValue("slug", sluguify(form.getValues("name") ?? ""));
  };

  const onSubmit = (data: CategoryFormValues) => {
    startTransition(async () => {
      const res = await createCategory(data);
      if (res.success === false) {
        toast.error(res.message || "Failed to create category.");
      } else {
        toast.success("Category created successfully!");
        form.reset();
        router.push("/admin/categories");
      }
    });
  };

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
        <FormInput
          label="Description"
          placeholder="Category Description"
          control={form.control}
          name="description"
        />

        <Button type="submit">
          {isPending ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <PlusSquare className="w-4 h-4" />
          )}
          {isPending ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
