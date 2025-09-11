"use server";

import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/lib/constants/constants";
import { convertToPlainObject } from "../../utils";
import { prisma } from "@/db/prisma";
import {
  insertProductSchema,
  updateProductSchema,
} from "@/lib/validators/product.validator";
import { Product, ProductInput } from "@/lib/types/product.type";
import { logger } from "@/lib/helpers/logger";
import { revalidatePath } from "next/cache";
import z from "zod";

//Fetch latest products
export const getLatestProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: LATEST_PRODUCTS_LIMIT,
      include: {
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return {
      success: true,
      data: convertToPlainObject(products),
      message: "Latest products fetched successfully",
    };
  } catch (error) {
    logger.error("Error fetching latest products", { error });
    return {
      success: false,
      message: "Error fetching latest products",
    };
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return {
      success: true,
      data: convertToPlainObject(product),
      message: "Product fetched successfully",
    };
  } catch (error) {
    logger.error("Error fetching product by slug", { error });
    return {
      success: false,
      message: "Error fetching product by slug",
    };
  }
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    const parsed = updateProductSchema.parse(data);

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...parsed,
        // handle categories separately
        categories:
          parsed.categoryIds === undefined
            ? undefined // If no category, do nothing
            : parsed.categoryIds === null
            ? { set: [] } // If null, clear all categories
            : { set: parsed.categoryIds.map((cid) => ({ id: cid })) },
      },
      include: {
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return {
      success: true,
      data: convertToPlainObject(updated),
      message: "Product updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Error updating product",
    };
  }
};

export const createProduct = async (
  data: z.input<typeof insertProductSchema>
) => {
  try {
    const parsed = insertProductSchema.parse(data);

    const created = await prisma.product.create({
      data: {
        ...parsed,
        categories:
          parsed.categoryIds && parsed.categoryIds.length > 0
            ? { connect: parsed.categoryIds.map((cid) => ({ id: cid })) }
            : undefined,
      },
      include: {
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    revalidatePath(`/admin/products`);

    return {
      success: true,
      data: convertToPlainObject(created),
      message: "Product created successfully",
    };
  } catch {
    return {
      success: false,
      message: "Error creating product",
    };
  }
};

export const getAllProducts = async (
  query: string,
  page: number,
  category?: string,
  limit: number = PAGE_SIZE
) => {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    const dataCount = await prisma.product.count();

    return {
      success: true,
      data: convertToPlainObject(products),
      meta: {
        totalCount: dataCount,
        currentPage: page,
        totalPages: Math.ceil(dataCount / limit),
      },
    };
  } catch (error) {
    logger.error("Error fetching products", { error });
    return {
      success: false,
      message: "Error fetching products",
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath(`/admin/products`);
    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    logger.error("Error deleting product", { error });
    return {
      success: false,
      message: "Error deleting product",
    };
  }
};
