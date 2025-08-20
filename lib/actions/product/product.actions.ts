"use server";

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/constants";
import { convertToPlainObject } from "../../utils";
import { prisma } from "@/db/prisma";

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
  });

  return convertToPlainObject(product);
};
