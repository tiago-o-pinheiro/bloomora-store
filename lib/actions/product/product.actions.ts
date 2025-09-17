"use server";

import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/lib/constants/constants";
import { convertToPlainObject } from "../../utils";
import { prisma } from "@/db/prisma";
import {
  insertProductSchema,
  updateProductSchema,
} from "@/lib/validators/product.validator";
import { logger } from "@/lib/helpers/logger";
import { revalidatePath } from "next/cache";
import z from "zod";
import { Prisma } from "@prisma/client";
import { getImageKey } from "@/lib/helpers/get-image-key";
import { utapi } from "@/app/api/uploadthing/core";

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

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
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
    logger.error("Error fetching product by id", { error });
    return {
      success: false,
      message: "Error fetching product by id",
    };
  }
};

export const updateProduct = async (
  id: string,
  data: z.input<typeof updateProductSchema>
) => {
  try {
    const parsed = updateProductSchema.parse({ ...data, id });

    const { categoryIds, id: productId, images: nextImages, ...rest } = parsed;

    const before =
      nextImages !== undefined
        ? await prisma.product.findUnique({
            where: { id: productId },
            select: { images: true },
          })
        : null;

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        ...rest,
        ...(nextImages !== undefined && { images: nextImages }),
        categories:
          categoryIds === undefined
            ? undefined
            : categoryIds === null
            ? { set: [] }
            : { set: categoryIds.map((cid) => ({ id: cid })) },
      },
      include: {
        categories: { select: { id: true, name: true, slug: true } },
      },
    });

    if (nextImages !== undefined && before) {
      const prev = new Set((before.images ?? []).map(getImageKey));
      const next = new Set(nextImages.map(getImageKey));
      const removed = [...prev].filter((k) => !next.has(k));

      if (removed.length > 0) {
        try {
          await utapi.deleteFiles(removed);
        } catch (err) {
          console.error("UploadThing delete failed (product images):", err);
        }
      }
    }

    return {
      success: true,
      data: convertToPlainObject(updated),
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error updating product", error);
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

    const { categoryIds = [], price, images, ...rest } = parsed;

    const created = await prisma.product.create({
      data: {
        ...rest,
        images: images,
        price: new Prisma.Decimal(String(price)),
        categories: categoryIds?.length
          ? { connect: categoryIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        categories: { select: { id: true, name: true, slug: true } },
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
      message: `Error creating product: ${data.name}`,
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
      orderBy: { createdAt: "desc" },
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

    if (product.images?.length) {
      try {
        const keys = product.images.map(getImageKey);
        await utapi.deleteFiles(keys);
      } catch (err) {
        console.error("UploadThing delete failed (product images):", err);
      }
    }

    revalidatePath(`/admin/products`);
    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product", error);
    return {
      success: false,
      message: "Error deleting product",
    };
  }
};
