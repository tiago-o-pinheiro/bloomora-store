"use client";

import { Button } from "@/components/ui/button";
import { Column, DataTable } from "@/components/ui/table/DataTable";
import DeleteDialog from "@/components/widgets/delete-dialog/DeleteDialog";
import { deleteProduct } from "@/lib/actions/product/product.actions";
import { Product } from "@/lib/types/product.type";
import { formatCurrency, formatId, formatNumber } from "@/lib/utils";
import Link from "next/link";

const useProductTableColumns = () => {
  const columns: Column<Product>[] = [
    {
      header: "ID",
      accessor: (row) => formatId(row.id),
    },
    {
      header: "Name",
      accessor: (row) => row.name,
    },
    {
      header: "Price",
      accessor: (row) => <span>{formatCurrency(row.price)}</span>,
    },
    {
      header: "Stock",
      accessor: (row) => <span>{formatNumber(row.stock)}</span>,
    },
    {
      header: "Rating",
      accessor: (row) => <span>{row.rating}</span>,
    },
    {
      header: "Actions",
      className: "text-left",
      accessor: (row) => (
        <div className="w-[100px] flex fle-row gap-2">
          <Button variant="outline">
            <Link href={`/admin/products/${row.id}`}>Edit</Link>
          </Button>
          <DeleteDialog
            id={row.id}
            action={async () => deleteProduct(row.id)}
          />
        </div>
      ),
    },
  ];

  return columns;
};

const ProductTable = ({ products }: { products: Product[] }) => {
  const columns = useProductTableColumns();
  return (
    <DataTable columns={columns} data={products} rowKey={(row) => row.id} />
  );
};

export default ProductTable;
