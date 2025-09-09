"use client";

import { Button } from "@/components/ui/button";
import { updateOrderPaymentStatus } from "@/lib/actions/order/order.actions";
import { Order } from "@/lib/types/order.type";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const ChangePaymentStatus = ({ id, isPaid }: Partial<Order>) => {
  const [isPending, startTransition] = useTransition();

  const handlePaymentStatusChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await updateOrderPaymentStatus(id ?? "", !isPaid);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("An error occurred while updating payment status");
      }
    });
  };

  return (
    <form onSubmit={handlePaymentStatusChange}>
      <Button variant="outline" type="submit">
        {isPending ? (
          <>
            <Loader className="animate-spin" /> Updating
          </>
        ) : (
          `Change to ${isPaid ? "Unpaid" : "Paid"}`
        )}
      </Button>
    </form>
  );
};

export default ChangePaymentStatus;
