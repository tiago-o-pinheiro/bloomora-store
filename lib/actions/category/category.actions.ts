"use server";

import { prisma } from "@/db/prisma";
import { Category } from "@/lib/types/category.type";
import { convertToPlainObject } from "@/lib/utils";
import { updateCategorySchema } from "@/lib/validators/category.validator";
import { z } from "zod";

// Get one category by id OR slug
export const getCategory = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return convertToPlainObject(category);
  } catch {
    return {
      success: false,
      message: "Error fetching category",
    };
  }
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
  try {
    const parsed = updateCategorySchema.parse(data);

    const updated = await prisma.category.update({
      where: { id },
      data: parsed,
    });

    return convertToPlainObject(updated);
  } catch {
    return {
      success: false,
      message: "Error updating category",
    };
  }
};

export const listCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return convertToPlainObject(categories);
};
