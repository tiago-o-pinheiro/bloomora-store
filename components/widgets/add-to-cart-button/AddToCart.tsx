"use client";

import { Button } from "@/components/ui/button";

import { Cart } from "@/lib/types/cart.types";
import { Item } from "@/lib/types/item.types";
import { Loader, Minus, Plus } from "lucide-react";
import { useAddToCart } from "./hooks/use-add-to-cart";

export type AddToCartProps = {
  item: Item;
  cart: Cart | null;
};

const AddToCartButton = ({ item, cart }: AddToCartProps) => {
  const existingInCart = cart?.items.find((i) => i.id === item.id);
  const { isPending, buttonClicked, handleAddToCart, handleRemoveFromCart } =
    useAddToCart(item);

  return existingInCart ? (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-4">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleRemoveFromCart}
          disabled={isPending}
        >
          {isPending && buttonClicked === "remove" ? (
            <Loader className="animate-spin" />
          ) : (
            <Minus />
          )}
        </Button>
        {existingInCart.quantity}
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleAddToCart}
          disabled={existingInCart.quantity === item.stock || isPending}
        >
          {isPending && buttonClicked === "add" ? (
            <Loader className="animate-spin" />
          ) : (
            <Plus />
          )}
        </Button>
      </div>
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
