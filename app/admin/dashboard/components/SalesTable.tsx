import { Button } from "@/components/ui/button";
import { Column, DataTable } from "@/components/ui/table/DataTable";
import { formatDate } from "@/lib/helpers/format-date";
import { Order } from "@/lib/types/order.type";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

type LatestSale = {
  id: string;
  createdAt: string | Date;
  totalPrice: string;
  user: { name: string } | null;
};

const useSalesTableColumns = () => {
  const columns: Column<LatestSale>[] = [
    {
      header: "User",
      accessor: (row) => row.user?.name ?? "Deleted user",
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
      className: "text-right",
    },
    {
      header: "Actions",
      accessor: (row) => (
        <Link href={`/order/${row.id}`}>
          <Button variant="link">View</Button>
        </Link>
      ),
      className: "w-0",
    },
  ];

  return columns;
};

const SalesTable = ({ sales }: { sales: Omit<Order, "orderItems">[] }) => {
  const columns = useSalesTableColumns();
  return <DataTable rowKey={(row) => row.id} columns={columns} data={sales} />;
};

export default SalesTable;
