import { DataTable } from "@/components/DataTable";
import { DashboardBasicServiceColumns } from "./Columns";
import { useBasicServices } from "@/hooks/services/useServices";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

const BasicServiceTable = () => {
  const services = useBasicServices({ pageIndex: 0, pageSize: 5 });
  const columns = DashboardBasicServiceColumns;
  const table = useReactTable({
    columns: columns,
    data: services.data?.results ?? [],
    rowCount: services.data?.count,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} isPaginated={false} isLoading={services.isFetching} />;
};

export { BasicServiceTable };
