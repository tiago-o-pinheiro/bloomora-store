"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type ToggleResult = { success: boolean; message: string };
type Props = {
  isDelivered: boolean;
  isDisabled?: boolean;
  onToggle: () => Promise<ToggleResult>;
};

export const ManageDeliveryButton = ({
  isDelivered,
  isDisabled = false,
  onToggle,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await onToggle();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("An error occurred while updating delivery status");
      }
    });
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleClick}
      disabled={isDisabled || isPending}
    >
      {isPending ? (
        <>
          <Loader className="mr-2 animate-spin" /> Updating…
        </>
      ) : isDelivered ? (
        "Mark as Not Delivered"
      ) : (
        "Mark as Delivered"
      )}
    </Button>
  );
};
