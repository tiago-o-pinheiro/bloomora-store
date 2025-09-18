import { getOrderById } from "@/lib/actions/order/order.actions";
import { notFound } from "next/navigation";

import Container from "@/components/widgets/container/Container";
import OrderDetailsPage from "./(components)/OrderDetail";

export const metadata = {
  title: "Order Details",
};

const OrderDetail = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const { data: order } = await getOrderById(id);

  if (!order) notFound();

  return (
    <Container className="container mx-auto justify-center">
      <OrderDetailsPage order={order} />
    </Container>
  );
};

export default OrderDetail;
