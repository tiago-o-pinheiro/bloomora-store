import { getOrderById } from "@/lib/actions/order/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./components/OrderDetailsTable";

export const metadata = {
  title: "Order Details",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = params;
  const { data: order } = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <OrderDetailsTable order={order} />
    </div>
  );
}
