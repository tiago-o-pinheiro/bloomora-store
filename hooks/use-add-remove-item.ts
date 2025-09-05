"use client";

import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/actions/cart/cart.actions";
import { toast } from "sonner";

import { Item } from "@/lib/types/item.types";
import { useRef, useTransition } from "react";

const INITIAL_LOADING = {
  add: false,
  remove: false,
};

export const useAddRemoveItem = (item: Item) => {
  const currentClicked = useRef<Record<string, boolean>>(INITIAL_LOADING);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    currentClicked.current.add = true;
    startTransition(async () => {
      const response = await addItemToCart(item);
      if (!response.success) {
        toast.error("Error", {
          description: response.message,
        });
        currentClicked.current.add = false;
        return;
      }
      toast.success("Add item to cart", {
        description: response.message,
      });
      currentClicked.current.add = false;
    });
  };

  const handleRemoveFromCart = async () => {
    currentClicked.current.remove = true;
    startTransition(async () => {
      const response = await removeItemFromCart(item.id);
      if (!response.success) {
        toast.error("Error", {
          description: response.message,
        });
        currentClicked.current.remove = false;
        return;
      }

      toast.success("Remove item from cart", {
        description: response.message,
      });
      currentClicked.current.remove = false;
    });
  };

  return {
    isPending,
    loading: currentClicked.current,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
