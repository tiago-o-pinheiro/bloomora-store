"use server";

import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "@/lib/constants/constants";
import { Category, CategoryExtended } from "@/lib/types/category.type";
import { Meta } from "@/lib/types/meta.type";
import { convertToPlainObject } from "@/lib/utils";
import { updateCategorySchema } from "@/lib/validators/category.validator";
import { revalidatePath } from "next/cache";

export const getCategory = async (idOrSlug: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        products: {
          select: { id: true, name: true, slug: true },
        },
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

    const { id: _, ...rest } = parsed; // remove id from update payload
    const updated = await prisma.category.update({
      where: { id },
      data: rest,
    });

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
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Error deleting category",
    };
  }
};
