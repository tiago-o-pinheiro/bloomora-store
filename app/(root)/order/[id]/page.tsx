import { getOrderById } from "@/lib/actions/order/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./components/OrderDetailsTable";

export const metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: { id: string } }) => {
  const orderId = props.params.id;
  const { data: order } = await getOrderById(orderId);

  console.log(order);

  if (!order) {
    return notFound();
  }

  return (
    <div>
      <OrderDetailsTable order={order} />
    </div>
  );
};

export default OrderDetailsPage;
