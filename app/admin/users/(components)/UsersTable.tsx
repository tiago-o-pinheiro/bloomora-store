"use client";

import { Button } from "@/components/ui/button";
import { Column, DataTable } from "@/components/ui/table/DataTable";
import DeleteDialog from "@/components/widgets/delete-dialog/DeleteDialog";
import { deleteUser } from "@/lib/actions/user/user.actions";
import { formatDate } from "@/lib/helpers/format-date";
import { UserAdmin } from "@/lib/types/user.type";

import Link from "next/link";

const useUsersTableColumns = () => {
  const columns: Column<UserAdmin>[] = [
    {
      header: "Name",
      accessor: (row) => row.name,
    },
    {
      header: "Email",
      accessor: (row) => row.email,
    },
    {
      header: "Role",
      accessor: (row) => row.role,
    },
    {
      header: "Created At",
      accessor: (row) => formatDate(row.createdAt),
    },
    {
      header: "Updated At",
      accessor: (row) => formatDate(row.updatedAt),
    },
    {
      header: "Actions",
      className: "text-left",
      accessor: (row) => (
        <div className="w-[100px] flex fle-row gap-2">
          <Button variant="outline">
            <Link href={`/admin/users/${row.id}`}>Edit</Link>
          </Button>
          <DeleteDialog id={row.id} action={async () => deleteUser(row.id)} />
        </div>
      ),
    },
  ];

  return columns;
};

const UsersTable = ({ users }: { users: UserAdmin[] }) => {
  const columns = useUsersTableColumns();
  return <DataTable columns={columns} data={users} rowKey={(row) => row.id} />;
};

export default UsersTable;
