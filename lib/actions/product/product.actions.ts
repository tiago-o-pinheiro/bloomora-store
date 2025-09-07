"use server";

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/constants";
import { convertToPlainObject } from "../../utils";
import { prisma } from "@/db/prisma";
import { updateProductSchema } from "@/lib/validators/product.validator";
import z from "zod";
import { Product } from "@/lib/types/product.type";

//Fetch latest products

export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT, // Add this line to limit the number of products returned
  });

  return convertToPlainObject(products);
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return convertToPlainObject(product);
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    const parsed = updateProductSchema.parse(data);

    const updated = await prisma.product.update({
      where: { id },
      data: parsed,
    });

    return convertToPlainObject(updated);
  } catch {
    return {
      success: false,
      message: "Error updating product",
    };
  }
};
