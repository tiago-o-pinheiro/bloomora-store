"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input/FormInput";
import { useTransition } from "react";
import { Loader, PlusSquare } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  insertProductSchema,
  updateProductSchema,
} from "@/lib/validators/product.validator";
import {
  createProduct,
  updateProduct,
} from "@/lib/actions/product/product.actions";

import { boolean, z } from "zod";
import FormTextarea from "@/components/ui/form-textarea/FormTextarea";
import FormCategories from "@/components/ui/form-categories/FormCategories";
import { sluguify } from "@/lib/helpers/sluguify";
import FormImageUpload from "@/components/ui/form-image-upload/FormImageUpload";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { UploadButton } from "@/components/widgets/upload-button/UploadButton";

const BUTTON_SUBMIT_LABEL = {
  create: "Create Product",
  edit: "Update Product",
};

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
  isFeatured: false,
  price: "",
  numReviews: 0,
  stock: 0,
  banner: "",
};

const CreateProductForm = ({
  type,
  product,
  productId,
  categories,
}: {
  type: "create" | "edit";
  product?: ProductFormValues; // can be insert or update shape
  productId?: string;
  categories: { id: string; name: string }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: (product ?? DEFAULT_PRODUCT) as ProductFormValues,
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
        if (!productId) {
          toast.error("Product ID is missing.");
          router.push("/admin/products");
          return;
        }
        const res = await updateProduct(productId, data as UpdateProductType);
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

  const categoriesSelected = form.watch("categoryIds");

  const images = form.watch("images") ?? [];
  const isFeatured = form.watch("isFeatured") as boolean;
  const banner = form.watch("banner") as string;

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

        <div>
          <FormItem className="flex items-center gap-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={isFeatured}
                onCheckedChange={(checked) =>
                  form.setValue("isFeatured", Boolean(checked))
                }
              />
            </FormControl>
            <Label>Is featured?</Label>
          </FormItem>
          {isFeatured && banner && (
            <Image
              src={banner}
              alt="Banner"
              width={1920}
              height={680}
              className="w-full object-cover object-center rounded-sm"
            />
          )}

          {isFeatured && !banner && (
            <div>
              <UploadButton
                endpoint={"imageUploader"}
                className="mt-4 ut-button:bg-slate-950"
                onClientUploadComplete={(res: { url: string }[]) => {
                  form.setValue("banner", res[0].url);
                }}
                onUploadError={(error: Error) => {
                  toast.error(
                    `Failed to upload banner image: ${error.message}`
                  );
                }}
              />
            </div>
          )}
        </div>
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
