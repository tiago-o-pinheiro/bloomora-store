import Pagination from "@/components/widgets/pagination/Pagination";
import { getUserOrders } from "@/lib/actions/order/order.actions";

import { Metadata } from "next";
import OrdersTable from "./components/OrdersTable";

export const metadata: Metadata = {
  title: "Order Details",
  description: "View details of your order",
};

const OrderDetailsPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const { data: orders, meta } = await getUserOrders({
    page: Number(page) || 1,
  });

  if (!orders) {
    return <div>No orders found</div>;
  }

  return (
    <div className="space-y-2">
      <h1 className="h2-bold text-2xl font-bold">My orders</h1>
      <div className="overflow-x-auto">
        <OrdersTable orders={orders} />
      </div>
      {(meta?.totalPages ?? 0) > 1 && (
        <Pagination
          page={Number(page) || 1}
          totalPages={meta?.totalPages || 1}
        />
      )}
    </div>
  );
};

export default OrderDetailsPage;
