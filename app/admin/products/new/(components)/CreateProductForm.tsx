"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input/FormInput";
import { Loader, PlusSquare } from "lucide-react";

import FormTextarea from "@/components/ui/form-textarea/FormTextarea";
import FormCategories from "@/components/ui/form-categories/FormCategories";
import FormImageUpload from "@/components/ui/form-image-upload/FormImageUpload";
import { useCreateProductForm } from "./use-product-form";
import { Product } from "@/lib/types/product.type";

const BUTTON_SUBMIT_LABEL = {
  create: "Create Product",
  edit: "Update Product",
};

const CreateProductForm = ({
  type,
  categories,
  product,
}: {
  type: "create" | "edit";
  product?: Product;
  categories: { id: string; name: string }[];
}) => {
  const {
    form,
    isPending,
    onSubmit,
    handleCategoryChange,
    handleGenerateSlug,
  } = useCreateProductForm(type, product || null);
  const categoriesSelected = form.watch("categoryIds");

  const images = form.watch("images") ?? [];

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <FormInput
            label="Name"
            placeholder="Product name"
            control={form.control}
            name="name"
          />
          <div className="w-full flex flex-row gap-2 items-center">
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
        </div>
        <FormInput
          label="Brand"
          placeholder="Brand"
          control={form.control}
          name="brand"
        />
        <FormCategories
          categories={categories}
          categoriesSelected={categoriesSelected ?? null}
          handleCategoryChange={handleCategoryChange}
        />
        <FormTextarea
          label="Description"
          placeholder="Description"
          control={form.control}
          name="description"
        />
        <div className="flex flex-colmd:flex-row gap-5 ">
          <FormInput
            label="Price"
            placeholder="Price"
            control={form.control}
            name="price"
          />
          <FormInput
            label="Stock"
            placeholder="Stock"
            control={form.control}
            name="stock"
          />
        </div>
        <FormImageUpload
          label="Images"
          control={form.control}
          name="images"
          images={images}
          handleImageUpload={(urls) =>
            form.setValue("images", [...images, ...urls])
          }
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

export default CreateProductForm;
