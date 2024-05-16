import { DataTable } from "@/components/DataTable";
import { getServiceItemColumns } from "./Columns";
import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DrawerDialog } from "@/components/DrawerDialog";
import { ServiceItem } from "@/models/ServiceItem";
import { useServiceItems } from "@/hooks/serviceitems/useServiceItems";
import { UpdateServiceItemForm } from "../../Forms/UpdateServiceItem";
import DeleteServiceItemForm from "../../Forms/DeleteServiceItem";

type DialogModes = "delete" | "view" | "update" | null;

interface Props {
  serviceId: number;
}

const ServiceItemsTable = ({ serviceId }: Props) => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogModes>(null);
  const [selectedItem, setSelectedItem] = useState<ServiceItem>(
    {} as ServiceItem
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = getServiceItemColumns({
    onDelete: (serviceItem) => tableActionHandler(serviceItem, "delete"),
    onUpdate: (serviceItem) => tableActionHandler(serviceItem, "update"),
    onView: (serviceItem) => tableActionHandler(serviceItem, "view"),
  });
  // TODO: I was in a rush and had some logical problems with implementing the other -
  // custom react query hooks for the service items. So, I've decided to choose the -
  // traditional way by manually handling the update / delete operations on service items.
  const listItems = useServiceItems(serviceId, pagination);

  const tableActionHandler = (serviceItem: ServiceItem, mode: DialogModes) => {
    setSelectedItem(serviceItem);
    setDialogMode(mode);
    setOpen(true);
  };

  const getDialogContent = () => {
    switch (dialogMode) {
      case "delete":
        return (
          <DeleteServiceItemForm
            item={selectedItem}
            onSuccess={() => setOpen(false)}
            serviceId={serviceId}
          />
        );
      case "update":
        return (
          <UpdateServiceItemForm
            defaultValues={selectedItem}
            itemId={selectedItem.id}
            onSuccess={() => setOpen(false)}
            serviceId={serviceId}
          />
        );
      case "view":
        return (
          <div className="pt-3 pb-6">
            {selectedItem.notes ? (
              <p className="text-justify">{selectedItem.notes}</p>
            ) : (
              <p className="text-center">
                There's no note available for the selected item.
              </p>
            )}
          </div>
        );

      default:
        return <></>;
    }
  };

  const table = useReactTable({
    columns: columns,
    data: listItems.data?.results ?? [],
    manualPagination: true,
    rowCount: listItems.data?.count,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="xl:col-span-2">
        <DataTable table={table} />
      </div>
      <DrawerDialog
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
        title="Service Item Action"
      >
        {getDialogContent()}
      </DrawerDialog>
    </>
  );
};

export default ServiceItemsTable;
