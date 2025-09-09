import { revalidatePath } from "next/cache";
import { updateOrderIsDelivered } from "@/lib/actions/order/order.actions";
import { ManageDeliveryButton } from "./components/ManageDeliveryButton";

type Props = {
  id: string;
  isDelivered: boolean;
  isDisabled?: boolean;
  revalidate?: string;
};

export const ChangeDeliveryStatusWrapper = ({
  id,
  isDelivered,
  isDisabled,
  revalidate,
}: Props) => {
  const onToggle = async () => {
    "use server";
    const res = await updateOrderIsDelivered(id, !isDelivered);
    if (res.success && revalidate) revalidatePath(revalidate);
    return res;
  };

  return (
    <ManageDeliveryButton
      isDelivered={isDelivered}
      isDisabled={isDisabled}
      onToggle={onToggle}
    />
  );
};
