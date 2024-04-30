import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TableColumn<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
}

const SimpleTable = <T extends object>({
  columns,
  data,
  isLoading = false,
}: TableProps<T>) => {
  const renderedRows = data.map((item, index) => {
    return (
      <TableRow key={`row-${index}`}>
        {columns.map((column) => {
          return (
            <TableCell key={`${index}-${column.label}`}>
              {column.render(item)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  const renderedHeaders = columns.map((column) => {
    return <TableHead key={column.label}>{column.label}</TableHead>;
  });

  // Note to self:
  // Maybe wrap the final elements with a div like this?
  // <div className="bg-white p-4 rounded-lg border shadow-sm"></div>

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-1/4" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <span className="p-5 font-semibold">No data available</span>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>{renderedHeaders}</TableRow>
      </TableHeader>
      <TableBody>{renderedRows}</TableBody>
    </Table>
  );
};

export { SimpleTable };
