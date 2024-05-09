import { DataTable } from "@/components/DataTable";
import { getStaffServiceColumns } from "./Columns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useServices } from "@/hooks/services/useServices";
import { useState } from "react";

const StaffServices = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const listServices = useServices(pagination);

  const serviceTable = useReactTable({
    columns: getStaffServiceColumns,
    data: listServices.data?.results ?? [],
    manualPagination: true,
    rowCount: listServices.data?.count,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grid gap-1">
          <h1 className="text-lg font-semibold md:text-2xl">Services</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage Repair Ninja's Services.
          </p>
        </div>
      </div>
      <div className="xl:col-span-2">
        <DataTable table={serviceTable} />
      </div>
    </>
  );
};

export default StaffServices;
