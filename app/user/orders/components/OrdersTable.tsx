import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Column, DataTable } from "@/components/ui/table/DataTable";
import { formatDate } from "@/lib/helpers/format-date";
import { Order } from "@/lib/types/order.type";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const useOrdersTableColumns = () => {
  const columns: Column<Omit<Order, "user">>[] = [
    {
      header: "ID",
      accessor: (row) => row.id,
    },
    {
      header: "Date",
      accessor: (row) =>
        formatDate(
          row.createdAt instanceof Date
            ? row.createdAt
            : new Date(row.createdAt),
          "dateOnly"
        ),
    },
    {
      header: "Total",
      accessor: (row) => formatCurrency(row.totalPrice),
    },
    {
      header: "Is Paid",
      accessor: (row) => (
        <Badge variant={row.isPaid ? "success" : "destructive"}>
          {row.isPaid ? "Paid" : "Unpaid"}
        </Badge>
      ),
    },
    {
      header: "Is Delivered",
      accessor: (row) => (
        <Badge variant={row.isDelivered ? "success" : "destructive"}>
          {row.isDelivered ? "Delivered" : "Not Delivered"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <Button variant="outline" asChild>
          <Link href={`/order/${row.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  return columns;
};

const OrdersTable = ({ orders }: { orders: Omit<Order, "user">[] }) => {
  const columns = useOrdersTableColumns();
  return <DataTable rowKey={(row) => row.id} columns={columns} data={orders} />;
};

export default OrdersTable;
