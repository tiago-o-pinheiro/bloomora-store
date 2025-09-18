import { Column, DataTable } from "@/components/ui/table/DataTable";
import { Order } from "@/lib/types/order.type";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const useOrderItemColumns = () => {
  const columns: Column<Order["orderItems"][number]>[] = [
    {
      header: "Item",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <Image src={row.image} alt={row.name} width={50} height={50} />
          <p>{row.name}</p>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessor: (row) => row.quantity,
    },
    {
      header: "Price",
      accessor: (row) => formatCurrency(Number(row.price)),
    },
  ];

  return columns;
};

const OrderItemsTable = ({
  orderItems,
}: {
  orderItems: Order["orderItems"];
}) => {
  const columns = useOrderItemColumns();
  return (
    <DataTable columns={columns} data={orderItems} rowKey={(row) => row.slug} />
  );
};

export default OrderItemsTable;
