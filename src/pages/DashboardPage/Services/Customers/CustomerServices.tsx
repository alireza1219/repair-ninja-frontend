import { DataTable } from "@/components/DataTable";
import { getServiceColumns } from "./Columns";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DrawerDialog } from "@/components/DrawerDialog";
import { BasicServiceListItem } from "@/models/Service";
import { useBasicServices } from "@/hooks/services/useServices";

const CustomerServices = () => {
  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<BasicServiceListItem | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const serviceColumns = useMemo(
    () =>
      getServiceColumns({
        viewDescription: (service) => viewServiceDescription(service),
      }),
    []
  );

  const listServices = useBasicServices(pagination);

  const serviceTable = useReactTable({
    columns: serviceColumns,
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

  const viewServiceDescription = (service: BasicServiceListItem) => {
    setSelectedService(service);
    setOpen(true);
  };

  const getDialogContent = () => {
    return (
      <div className="pt-3 pb-6">
        {selectedService?.description ? (
          <p className="text-justify">{selectedService.description}</p>
        ) : (
          <p className="text-center">There's no description available for the selected service.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grid gap-1">
          <h1 className="text-lg font-semibold md:text-2xl">Services</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your Service History on Repair Ninja.
          </p>
        </div>
      </div>
      <div className="xl:col-span-2">
        <DataTable table={serviceTable} />
      </div>
      <DrawerDialog
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
        title="Service Description"
        drawerCloseText="Close"
      >
        {getDialogContent()}
      </DrawerDialog>
    </>
  );
};

export default CustomerServices;
