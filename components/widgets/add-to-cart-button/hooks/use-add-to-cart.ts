"use client";

import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/actions/cart/cart.actions";

import { Item } from "@/lib/types/item.types";
import { useRouter } from "next/navigation";
import { useRef, useTransition, useEffect } from "react";
import { toast } from "sonner";

export const useAddToCart = (item: Item) => {
  const currentClicked = useRef<"add" | "remove">(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    currentClicked.current = "add";
    startTransition(async () => {
      const response = await addItemToCart(item);
      if (!response.success) {
        toast.error("Error", {
          description: response.message,
        });
        return;
      }
      toast.success("Add item to cart", {
        description: response.message,
        action: {
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  const handleRemoveFromCart = async () => {
    currentClicked.current = "remove";
    startTransition(async () => {
      const response = await removeItemFromCart(item.id);
      if (!response.success) {
        toast.error("Error", {
          description: response?.message,
        });
        return;
      }

      toast.success(response.message);
    });
  };

  useEffect(() => {
    if (!isPending) {
      currentClicked.current = null;
    }
  }, [isPending]);

  return {
    isPending,
    buttonClicked: currentClicked.current,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
