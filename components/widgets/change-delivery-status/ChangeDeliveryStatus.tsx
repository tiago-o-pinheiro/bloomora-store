"use client";

import { Button } from "@/components/ui/button";
import { updateOrderIsDelivered } from "@/lib/actions/order/order.actions";
import { Order } from "@/lib/types/order.type";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const ChangeDeliveryStatus = ({
  id,
  isDelivered,
  isDisabled,
}: Partial<Order> & { isDisabled: boolean }) => {
  const [isPending, startTransition] = useTransition();

  const handleDeliveryStatusChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await updateOrderIsDelivered(id ?? "", !isDelivered);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("An error occurred while updating delivery status");
      }
    });
  };

  return (
    <form onSubmit={handleDeliveryStatusChange}>
      <Button variant="outline" type="submit" disabled={isDisabled}>
        {isPending ? (
          <>
            <Loader className="animate-spin" /> Updating
          </>
        ) : (
          `Change to ${!isDelivered ? "Not Delivered" : "Delivered"}`
        )}
      </Button>
    </form>
  );
};

export default ChangeDeliveryStatus;
