"use client";

import { Button } from "@/components/ui/button";

import { addItemToCart } from "@/lib/actions/cart/cart.actions";
import { Item } from "@/lib/types/item.types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCartButton = ({ item }: { item: Item }) => {
  const router = useRouter();

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

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
