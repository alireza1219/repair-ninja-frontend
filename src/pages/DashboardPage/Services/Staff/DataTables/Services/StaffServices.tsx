import { DataTable } from "@/components/DataTable";
import { getStaffServiceColumns } from "./Columns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";
import { useMemo, useState } from "react";
import { useServices } from "@/hooks/services/useServices";
import { useServiceDelete } from "@/hooks/services/useServiceDelete";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/DrawerDialog";
import { LuPlusCircle } from "react-icons/lu";

const StaffServices = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: true,
    },
  ]);
  const [serviceID, setServiceID] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const listServices = useServices(pagination, sorting);
  const deleteService = useServiceDelete(() => setOpen(false));
  const serviceColumns = useMemo(
    () =>
      getStaffServiceColumns({
        onDelete: (id) => {
          setServiceID(id);
          setOpen(true);
        },
        onView: (id) => navigate(`${id}`),
      }),
    []
  );

  const serviceTable = useReactTable({
    columns: serviceColumns,
    data: listServices.data?.results ?? [],
    manualPagination: true,
    rowCount: listServices.data?.count,
    state: {
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
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
        <Link to={ROUTE_PATH.DASH_CREATE}>
          <Button size="sm" className="h-8 gap-1">
            <LuPlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Create Service
            </span>
          </Button>
        </Link>
      </div>
      <div className="xl:col-span-2">
        <DataTable table={serviceTable} />
      </div>
      <DrawerDialog
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
        title="Service Action"
      >
        <p>Are you sure you want to delete this service?</p>
        <Button
          className="mt-6 w-full"
          variant="destructive"
          disabled={deleteService.isPending}
          onClick={() => deleteService.mutateAsync(serviceID)}
        >
          {deleteService.isPending && <Spinner className="mr-2" size={16} />}
          Delete Service
        </Button>
      </DrawerDialog>
    </>
  );
};

export default StaffServices;
