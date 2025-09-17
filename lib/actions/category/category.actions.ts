"use server";

import { utapi } from "@/app/api/uploadthing/core";
import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "@/lib/constants/constants";
import { getImageKey } from "@/lib/helpers/get-image-key";
import { Category, CategoryExtended } from "@/lib/types/category.type";
import { Meta } from "@/lib/types/meta.type";
import { convertToPlainObject } from "@/lib/utils";
import {
  insertCategorySchema,
  updateCategorySchema,
} from "@/lib/validators/category.validator";
import { revalidatePath } from "next/cache";

export const getCategory = async (idOrSlug: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return {
      success: true,
      data: convertToPlainObject(category),
      message: "Category fetched successfully",
    };
  } catch {
    return {
      success: false,
      message: "Error fetching category",
    };
  }
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
  try {
    const parsed = updateCategorySchema.parse({ ...data, id });

    const before = await prisma.category.findUnique({
      where: { id: parsed.id },
      select: { image: true },
    });

    const { id: categoryId, ...rest } = parsed;
    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: rest,
    });

    const prevUrl = before?.image ?? null;
    const nextUrl = "image" in rest ? (rest.image as string | null) : undefined;

    const shouldDeletePrev =
      nextUrl !== undefined && prevUrl && prevUrl !== nextUrl;

    if (shouldDeletePrev) {
      try {
        await utapi.deleteFiles(getImageKey(prevUrl));
      } catch (e) {
        console.error("UploadThing delete failed (category image):", e);
      }
    }

    return {
      success: true,
      data: convertToPlainObject(updated),
      message: "Category updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Error updating category",
    };
  }
};

export const getAllCategories = async (
  query?: string,
  page?: number,
  limit: number = PAGE_SIZE
): Promise<{
  success: boolean;
  data: CategoryExtended[] | null;
  meta?: Meta;
  message: string;
}> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });

    return {
      success: true,
      data: convertToPlainObject(categories),
      meta: {
        totalPages: Math.ceil(categories.length / limit),
        currentPage: page ?? 1,
        totalCount: categories.length,
      },
      message: "Categories fetched successfully",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Error fetching categories",
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      select: { image: true },
    });

    await prisma.category.delete({ where: { id } });

    if (category?.image) {
      try {
        await utapi.deleteFiles(getImageKey(category.image));
      } catch (err) {
        console.error("UploadThing delete failed (category image):", err);
      }
    }

    revalidatePath("/admin/categories");

    return {
      success: true as const,
      message: "Category deleted successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false as const,
      message: "Error deleting category",
    };
  }
};

export const createCategory = async (data: Partial<Category>) => {
  try {
    const insertData = insertCategorySchema.parse(data);

    const created = await prisma.category.create({
      data: insertData,
    });

    revalidatePath("/admin/categories");

    return {
      success: true,
      data: convertToPlainObject(created),
      message: "Category created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error creating category",
    };
  }
};
