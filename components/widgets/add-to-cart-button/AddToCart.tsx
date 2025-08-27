"use client";

import { Button } from "@/components/ui/button";

import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/actions/cart/cart.actions";
import { Cart } from "@/lib/types/cart.types";
import { Item } from "@/lib/types/item.types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCartButton = ({ item, cart }: { item: Item; cart: Cart | null }) => {
  const router = useRouter();
  const existingInCart = cart?.items.find((i) => i.id === item.id);

  const handleAddToCart = async () => {
    const response = await addItemToCart(item);
    if (!response.success) {
      toast.error("Error", {
        description: response.message,
      });
      return;
    }

    toast.success(response.message, {
      action: (
        <div onClick={() => router.push("/cart")}>
          <Button variant="secondary" size="sm">
            Go to cart
          </Button>
        </div>
      ),
    });
  };

  const handleRemoveFromCart = async () => {
    const response = await removeItemFromCart(item.id);
    if (!response.success) {
      toast.error("Error", {
        description: response.message,
      });
      return;
    }

    toast.success(response.message);
  };

  return existingInCart ? (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-4">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleRemoveFromCart}
        >
          <Minus />
        </Button>
        {existingInCart.quantity}
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleAddToCart}
          disabled={existingInCart.quantity === item.stock}
        >
          <Plus />
        </Button>
      </div>
      {existingInCart.quantity === item.stock && (
        <p className="text-sm text-red-500">Maximum quantity reached</p>
      )}
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
