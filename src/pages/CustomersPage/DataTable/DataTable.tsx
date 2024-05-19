import { Customer } from "@/models/Customer";
import { getCustomerColumns } from "./Columns";
import { useCustomers } from "@/hooks/customers/useCustomers";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/DataTable";

type ActionModes = "update_profile" | "update_phone" | "delete";

export interface CustomerDataTableProps {
  actionHandler: (customer: Customer, mode: ActionModes) => void;
}

const CustomersDataTable = ({ actionHandler }: CustomerDataTableProps) => {
  const customerColumns = useMemo(
    () =>
      getCustomerColumns({
        onProfileUpdate: (customer) =>
          actionHandler(customer, "update_profile"),
        onPhoneUpdate: (customer) => actionHandler(customer, "update_phone"),
        onDelete: (customer) => actionHandler(customer, "delete"),
      }),
    []
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const listCustomers = useCustomers(pagination);
  const table = useReactTable({
    columns: customerColumns,
    data: listCustomers.data?.results ?? [],
    manualPagination: true,
    rowCount: listCustomers.data?.count,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <div className="xl:col-span-2">
      <DataTable table={table} />
    </div>
  );
};

export default CustomersDataTable;
