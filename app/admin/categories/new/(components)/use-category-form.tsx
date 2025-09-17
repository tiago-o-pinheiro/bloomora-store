import {
  createCategory,
  updateCategory,
} from "@/lib/actions/category/category.actions";
import { sluguify } from "@/lib/helpers/sluguify";
import { Category } from "@/lib/types/category.type";
import {
  insertCategorySchema,
  updateCategorySchema,
} from "@/lib/validators/category.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type InsertCategoryType = z.input<typeof insertCategorySchema>;
type UpdateCategoryType = z.input<typeof updateCategorySchema>;
type CategoryFormValues = InsertCategoryType | UpdateCategoryType;

const FORM_SCHEMA = z.union([insertCategorySchema, updateCategorySchema]);

const DEFAULT_CATEGORY: InsertCategoryType = {
  name: "",
  slug: "",
  description: "",
  image: "",
};

export const useCategoryForm = (
  type: "create" | "update",
  category: Category
) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: type === "create" ? DEFAULT_CATEGORY : category,
  });

  const handleGenerateSlug = () => {
    form.setValue("slug", sluguify(form.getValues("name") ?? ""));
  };

  const onSubmit = (data: CategoryFormValues) => {
    startTransition(async () => {
      if (type === "create") {
        const res = await createCategory(data);
        if (res.success === false) {
          toast.error(res.message || "Failed to create category.");
        } else {
          toast.success("Category created successfully!");
          form.reset();
          router.push("/admin/categories");
        }
      } else {
        if (!category) {
          toast.error("Category is missing.");
          router.push("/admin/categories");
          return;
        }
        const rest = await updateCategory(category.id, data);
        if (rest.success === false) {
          toast.error(rest.message || "Failed to update category.");
        } else {
          toast.success("Category updated successfully!");
          router.push("/admin/categories");
        }
      }
    });
  };

  return { form, isPending, handleGenerateSlug, onSubmit };
};
