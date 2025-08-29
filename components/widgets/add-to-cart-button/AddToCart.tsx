"use client";

import { Button } from "@/components/ui/button";

import { Cart } from "@/lib/types/cart.types";
import { Item } from "@/lib/types/item.types";
import { Loader, Plus } from "lucide-react";
import { QuantityPicker } from "@/components/ui/quantity-picker/QuantityPicker";
import { useAddRemoveItem } from "@/hooks/use-add-remove-item";

export type AddToCartProps = {
  item: Item;
  cart: Cart | null;
};

const AddToCartButton = ({ item, cart }: AddToCartProps) => {
  const existingInCart = cart?.items.find((i) => i.id === item.id);
  const { isPending, handleAddToCart } = useAddRemoveItem(item);

  console.log(existingInCart, item);

  return existingInCart ? (
    <div className="flex flex-col gap-2 w-full">
      <QuantityPicker item={existingInCart} />
      {existingInCart.quantity === item.stock && (
        <p className="text-sm text-red-500">Maximum quantity reached</p>
      )}
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
