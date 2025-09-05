import { getOrderById } from "@/lib/actions/order/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./components/OrderDetailsTable";

export const metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const { data: order } = await getOrderById(id);

  if (!order) notFound();

  return (
    <div>
      <OrderDetailsTable order={order} />
    </div>
  );
};

export default OrderDetailsPage;
