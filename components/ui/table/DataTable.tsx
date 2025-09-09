// types
import { ReactNode } from "react";

type KeyPath<T extends Record<string, unknown>> = keyof T | string;

export type Column<T extends Record<string, unknown>> = {
  header: ReactNode;
  key?: KeyPath<T>;
  accessor?: (row: T, rowIndex: number) => ReactNode;
  className?: string;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  data: T[] | undefined | null;
  rowKey: (row: T, index: number) => React.Key;
  emptyMessage?: ReactNode;
  headerRowClassName?: string;
  bodyRowClassName?: (row: T, index: number) => string | undefined;
};

const getByPath = <T extends Record<string, unknown>>(
  obj: T,
  path?: KeyPath<T>
): unknown => {
  if (!path) return undefined;

  if (typeof path !== "string") {
    return obj[path as keyof T];
  }

  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc !== null && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  emptyMessage = "No results.",
  headerRowClassName,
  bodyRowClassName,
}: DataTableProps<T>) => {
  const rows = Array.isArray(data) ? data : [];

  return (
    <Table>
      <TableHeader>
        <TableRow className={headerRowClassName}>
          {columns.map((col, i) => (
            <TableHead key={i} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
          </TableRow>
        ) : (
          rows.map((row, rowIndex) => (
            <TableRow
              key={rowKey(row, rowIndex)}
              className={bodyRowClassName?.(row, rowIndex)}
            >
              {columns.map((col, colIndex) => {
                const content =
                  col.accessor != null
                    ? col.accessor(row, rowIndex)
                    : getByPath(row, col.key);
                return (
                  <TableCell key={colIndex} className={col.className}>
                    {content as ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
