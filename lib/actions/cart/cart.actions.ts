"use server";

import { Item } from "@/lib/types/item.types";

export const addItemToCart = async (data: Item) => {
  return {
    success: true,
    message: "Item added to cart successfully",
  };
};
