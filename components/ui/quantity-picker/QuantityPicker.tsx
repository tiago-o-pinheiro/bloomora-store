"use client";

import { useAddRemoveItem } from "@/hooks/use-add-remove-item";
import { Item } from "@/lib/types/item.type";
import { Button } from "../button";
import { Loader, Minus, Plus, Trash } from "lucide-react";

const Spinner = () => {
  return <Loader className="animate-spin" />;
};

export const QuantityPicker = ({ item }: { item: Item }) => {
  const { handleAddToCart, handleRemoveFromCart, loading } =
    useAddRemoveItem(item);

  if (!item) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <div>
        <Button
          onClick={handleRemoveFromCart}
          disabled={loading.remove}
          variant={"outline"}
        >
          {loading.remove ? (
            <Spinner />
          ) : item.quantity === 1 ? (
            <Trash />
          ) : (
            <Minus />
          )}
        </Button>
      </div>
      <span>{item.quantity}</span>
      <div>
        <Button
          onClick={handleAddToCart}
          disabled={loading.add}
          variant={"outline"}
        >
          {loading.add ? <Spinner /> : <Plus />}
        </Button>
      </div>
    </div>
  );
};
