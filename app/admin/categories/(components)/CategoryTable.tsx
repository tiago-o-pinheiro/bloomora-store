"use client";

import { Button } from "@/components/ui/button";
import { Column, DataTable } from "@/components/ui/table/DataTable";
import DeleteDialog from "@/components/widgets/delete-dialog/DeleteDialog";
import { deleteCategory } from "@/lib/actions/category/category.actions";
import { CategoryExtended } from "@/lib/types/category.type";
import { formatId, formatNumber } from "@/lib/utils";
import Link from "next/link";

const useCategoryTableColumns = () => {
  const columns: Column<CategoryExtended>[] = [
    {
      header: "ID",
      accessor: (row) => formatId(row.id),
    },
    {
      header: "Name",
      accessor: (row) => row.name,
    },
    {
      header: "Description",
      accessor: (row) => <span>{row.description}</span>,
    },
    {
      header: "Total Products",
      accessor: (row) => <span>{formatNumber(row._count.products)}</span>,
    },
    {
      header: "Actions",
      className: "text-left",
      accessor: (row) => (
        <div className="w-[100px] flex fle-row gap-2">
          <Button variant="outline">
            <Link href={`/admin/category/${row.id}`}>Edit</Link>
          </Button>
          <DeleteDialog
            id={row.id}
            action={async () => deleteCategory(row.id)}
          />
        </div>
      ),
    },
  ];

  return columns;
};

const CategoryTable = ({ categories }: { categories: CategoryExtended[] }) => {
  const columns = useCategoryTableColumns();
  return (
    <DataTable columns={columns} data={categories} rowKey={(row) => row.id} />
  );
};

export default CategoryTable;
