import {
  createProduct,
  updateProduct,
} from "@/lib/actions/product/product.actions";
import { sluguify } from "@/lib/helpers/sluguify";
import { Product } from "@/lib/types/product.type";
import {
  insertProductSchema,
  updateProductSchema,
} from "@/lib/validators/product.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type InsertProductType = z.input<typeof insertProductSchema>;
type UpdateProductType = z.input<typeof updateProductSchema>;
type ProductFormValues = InsertProductType | UpdateProductType;

const FORM_SCHEMA = z.union([insertProductSchema, updateProductSchema]);

const DEFAULT_PRODUCT: InsertProductType = {
  name: "",
  slug: "",
  categoryIds: [],
  brand: "",
  description: "",
  images: [],
  price: "",
  numReviews: 0,
  stock: 0,
};

export const useCreateProductForm = (type: string, product: Product | null) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues:
      type === "edit" && product
        ? {
            ...product,
            categoryIds: product.categories?.map((c) => c.id) || [],
          }
        : DEFAULT_PRODUCT,
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    startTransition(async () => {
      if (type === "create") {
        const res = await createProduct(data as InsertProductType);
        if (!res.success) {
          toast.error(res.message || "Failed to create product.");
          return;
        }
        toast.success("Product created successfully!");
      } else {
        if (!product) {
          toast.error("Product is missing.");
          router.push("/admin/products");
          return;
        }
        const res = await updateProduct(product.id, data as UpdateProductType);
        if (!res.success) {
          toast.error(res.message || "Failed to update product.");
          return;
        }
        toast.success("Product updated successfully!");
      }
      router.push("/admin/products");
    });
  };

  const handleCategoryChange = (next: string[]) => {
    form.setValue("categoryIds", next);
  };

  const handleGenerateSlug = () => {
    form.setValue("slug", sluguify(form.getValues("name") ?? ""));
  };

  return {
    form,
    isPending,
    onSubmit,
    handleCategoryChange,
    handleGenerateSlug,
  };
};
