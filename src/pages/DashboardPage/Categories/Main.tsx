import { categoryColumns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import { CategoryList } from "@/models/Category";
import { listCategory } from "@/services/Category";
import {
  PaginationState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const DashboardCategories = () => {
  // Pagination state. Check out the PaginationState interface.
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useQuery<CategoryList>({
    // For reference:
    // https://tanstack.com/query/latest/docs/framework/react/guides/queries
    // https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
    queryKey: ["categories", pagination],
    // https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
    queryFn: async () => {
      const response = await listCategory({
        // Setting the default pageIndex to 1, will cause a conflict with react-table.
        // The react-table thinks we're currently on the second page :D!
        // This is a simple workaround for now.
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });

      return response.data;
    },
    // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    columns: categoryColumns,
    data: dataQuery.data?.results || [],
    // manualPagination must be set to true since we're using a server-side pagination.
    manualPagination: true,
    rowCount: dataQuery.data?.count,
    state: {
      pagination
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

export default DashboardCategories;
