"use client";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order/order.actions";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <p>Place Order</p>
        </div>
      )}
    </Button>
  );
};

const PlaceOrderButton = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await createOrder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <SubmitButton />
    </form>
  );
};

export default PlaceOrderButton;
