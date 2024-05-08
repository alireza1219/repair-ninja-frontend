import { DataTable } from "@/components/DataTable";
import { DashboardServiceColumns } from "./Columns";
import { useServices } from "@/hooks/services/useServices";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

const ServiceTable = () => {
  const services = useServices({ pageIndex: 0, pageSize: 5 });
  const columns = DashboardServiceColumns;
  const table = useReactTable({
    columns: columns,
    data: services.data?.results ?? [],
    rowCount: services.data?.count,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DataTable
      table={table}
      isPaginated={false}
      isLoading={services.isFetching}
    />
  );
};

export { ServiceTable };
