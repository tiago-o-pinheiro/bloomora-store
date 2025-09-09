import { getOrderById } from "@/lib/actions/order/order.actions";
import { notFound } from "next/navigation";

import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import OrderDetailsPage from "./components/OrderDetail";

export const metadata = {
  title: "Order Details",
};

const OrderDetail = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const { data: order } = await getOrderById(id);

  if (!order) notFound();

  return (
    <AnimatedContainer className="container mx-auto justify-center">
      <OrderDetailsPage order={order} />
    </AnimatedContainer>
  );
};

export default OrderDetail;
