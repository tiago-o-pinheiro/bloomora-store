import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/widgets/pagination/Pagination";
import { getUserOrders } from "@/lib/actions/order/order.actions";
import { formatDate } from "@/lib/helpers/format-date";
import { formatCurrency } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Details",
  description: "View details of your order",
};

const OrderDetailsPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getUserOrders({ page: Number(page) || 1 });

  return (
    <div className="space-y-2">
      <h2>Order Details</h2>
      <div className="overflow-x-auto">
        {orders.data ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Is Paid</TableHead>
                  <TableHead className="text-center">Is Delivered</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(order.totalPrice)}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.isPaid && order.paidAt ? (
                        formatDate(order.paidAt)
                      ) : (
                        <Badge variant="destructive">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.isDelivered ? (
                        <Badge variant="success">Yes</Badge>
                      ) : (
                        <Badge variant="destructive">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/order/${order.id}`}>
                        <Button variant="outline">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {orders.totalPages > 1 && (
              <Pagination
                page={Number(page) || 1}
                totalPages={orders.totalPages}
                urlParamName="page"
              />
            )}
          </>
        ) : (
          <div>No orders found</div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
