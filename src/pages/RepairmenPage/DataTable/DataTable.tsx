import { Repairman } from "@/models/Repairman";
import { getRepairmanColumns } from "./Columns";
import { useRepairmen } from "@/hooks/repairmen/useRepairmen";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/DataTable";

type ActionModes = "update_profile" | "update_phone" | "delete";

export interface RepairmanDataTableProps {
  actionHandler: (repairman: Repairman, mode: ActionModes) => void;
}

const RepairmenDataTable = ({ actionHandler }: RepairmanDataTableProps) => {
  const repairmanColumns = useMemo(
    () =>
      getRepairmanColumns({
        onProfileUpdate: (repairman) =>
          actionHandler(repairman, "update_profile"),
        onPhoneUpdate: (repairman) => actionHandler(repairman, "update_phone"),
        onDelete: (repairman) => actionHandler(repairman, "delete"),
      }),
    []
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const listRepairmen = useRepairmen(pagination);
  const table = useReactTable({
    columns: repairmanColumns,
    data: listRepairmen.data?.results ?? [],
    manualPagination: true,
    rowCount: listRepairmen.data?.count,
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

export default RepairmenDataTable;
