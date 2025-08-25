"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
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

    toast.success(`${item.name} added to cart successfully`, {
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go to cart"
          onClick={() => router.push("/cart")}
        >
          Go to cart
        </ToastAction>
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
