import { getAllOrders } from "@/lib/actions/order/order.actions";
import { Metadata } from "next";
import OrdersTable from "./components/OrdersTable";
import Pagination from "@/components/widgets/pagination/Pagination";

export const metadata: Metadata = {
  title: "Admin Orders",
  description: "Manage orders in the admin panel",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = "1" } = await props.searchParams;

  const { data: orders, meta } = await getAllOrders(Number(page));

  if (orders?.length === 0) {
    return (
      <div>
        <h2>No orders found</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h2-bold text-2xl font-bold">Orders</h1>
      <OrdersTable orders={orders ?? []} />
      {(meta?.totalPages ?? 0) > 1 && (
        <Pagination page={Number(page)} totalPages={meta?.totalPages ?? 0} />
      )}
    </div>
  );
};

export default AdminOrdersPage;
