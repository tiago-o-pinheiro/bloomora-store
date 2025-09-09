"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type ToggleResult = { success: boolean; message: string };
type Props = {
  isPaid: boolean;
  onToggle: () => Promise<ToggleResult>;
};

export const ManagePaymentButton = ({ isPaid, onToggle }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await onToggle();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("An error occurred while updating payment status");
      }
    });
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader className="mr-2 animate-spin" /> Updating…
        </>
      ) : isPaid ? (
        "Mark as Unpaid"
      ) : (
        "Mark as Paid"
      )}
    </Button>
  );
};
