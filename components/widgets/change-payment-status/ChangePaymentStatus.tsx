import { revalidatePath } from "next/cache";
import { updateOrderPaymentStatus } from "@/lib/actions/order/order.actions";
import { ManagePaymentButton } from "./components/ManagePaymentButton";

type Props = {
  id: string;
  isPaid: boolean;
  revalidate?: string;
};

export const ChangePaymentStatus = ({ id, isPaid, revalidate }: Props) => {
  const onToggle = async () => {
    "use server";
    const res = await updateOrderPaymentStatus(id, !isPaid);
    if (res.success && revalidate) revalidatePath(revalidate);
    return res;
  };

  return <ManagePaymentButton isPaid={isPaid} onToggle={onToggle} />;
};
