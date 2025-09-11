"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input/FormInput";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { insertProductSchema } from "@/lib/validators/product.validator";
import { createProduct } from "@/lib/actions/product/product.actions";

import { z } from "zod";
type ProductFormType = z.input<typeof insertProductSchema>;

const DEFAULT_PRODUCT: ProductFormType = {
  name: "",
  slug: "",
  categoryIds: [],
  brand: "",
  description: "",
  images: [],
  isFeatured: false,
  price: "",
  numReviews: 0,
  stock: 0,
  banner: null,
};

const CreateProductForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ProductFormType>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: DEFAULT_PRODUCT,
  });

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    startTransition(async () => {
      const res = await createProduct(data);
      if (res.success === false) {
        toast.error("Failed to create product.");
      } else {
        toast.success("Product created successfully!");
        router.push("/admin/products");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Name"
          placeholder="Product name"
          control={form.control}
          name="name"
        />
        <FormInput
          label="Slug"
          placeholder="Slug"
          control={form.control}
          name="slug"
        />
        <FormInput
          label="Category IDs (comma separated)"
          placeholder="Category IDs (comma separated)"
          control={form.control}
          name="categoryIds"
        />
        <FormInput
          label="Brand"
          placeholder="Brand"
          control={form.control}
          name="brand"
        />
        <FormInput
          label="Description"
          placeholder="Description"
          control={form.control}
          name="description"
        />
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
        <FormInput
          label="Banner"
          placeholder="Banner"
          control={form.control}
          name="banner"
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}{" "}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
