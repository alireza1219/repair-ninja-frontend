import { DataTable } from "@/components/DataTable";
import { DialogModes } from "@/types/common";
import { getManufacturerColumns } from "./Columns";
import { Manufacturer } from "@/models/Manufacturer";
import { useManufacturers } from "@/hooks/manufacturers/useManufacturers";
import { useManufacturerCreate } from "@/hooks/manufacturers/useManufacturerCreate";
import { useManufacturerUpdate } from "@/hooks/manufacturers/useManufacturerUpdate";
import { useManufacturerDelete } from "@/hooks/manufacturers/useManufacturerDelete";
import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ManufacturerForm } from "./components/ManufacturerForm";
import { DrawerDialog } from "@/components/DrawerDialog";
import { LuPlusCircle } from "react-icons/lu";
import Spinner from "@/components/Spinner";

const DashboardManufacturers = () => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogModes>(null);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const manufacturerColumns = getManufacturerColumns({
    onDelete: (manufacturer) => tableActionHandler(manufacturer, "delete"),
    onUpdate: (manufacturer) => tableActionHandler(manufacturer, "update"),
  });

  // Mutation Success Handler.
  const onMutationSuccess = () => {
    setOpen(false);
  };
  // Table Action Handler.
  const tableActionHandler = (
    manufacturer: Manufacturer,
    mode: DialogModes
  ) => {
    setSelectedManufacturer(manufacturer);
    setDialogMode(mode);
    setOpen(true);
  };
  // Dialog Content Generator.
  const getDialogContent = () => {
    switch (dialogMode) {
      case "create":
        return (
          <ManufacturerForm
            onSubmit={async (data) => {
              return createManufacturer.mutateAsync(data);
            }}
            isPending={createManufacturer.isPending}
          />
        );
      case "update":
        return (
          <ManufacturerForm
            onSubmit={async (data) => {
              return updateManufacturer.mutateAsync(data);
            }}
            isPending={updateManufacturer.isPending}
            initialData={selectedManufacturer!}
          />
        );
      case "delete":
        return (
          <div>
            <p>
              Are you sure you want to delete the {selectedManufacturer?.name}{" "}
              manufacturer with ID {selectedManufacturer?.id}?
            </p>
            <Button
              className="mt-6 w-full"
              variant="destructive"
              disabled={deleteManufacturer.isPending}
              onClick={() =>
                deleteManufacturer.mutateAsync(selectedManufacturer!)
              }
            >
              {deleteManufacturer.isPending && (
                <Spinner className="mr-2" size={16} />
              )}
              Delete Manufacturer
            </Button>
          </div>
        );

      default:
        return <></>;
    }
  };

  // Manufacturer related hooks.
  const listManufacturers = useManufacturers(pagination);
  const createManufacturer = useManufacturerCreate(onMutationSuccess);
  const updateManufacturer = useManufacturerUpdate(onMutationSuccess);
  const deleteManufacturer = useManufacturerDelete(onMutationSuccess);
  const table = useReactTable({
    columns: manufacturerColumns,
    data: listManufacturers.data?.results ?? [],
    manualPagination: true,
    rowCount: listManufacturers.data?.count,
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
          <h1 className="text-lg font-semibold md:text-2xl">
            Manufacturers
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage Repair Ninja's Manufacturers.
          </p>
        </div>
        <Button
          onClick={() => {
            setDialogMode("create");
            setOpen(true);
          }}
          size="sm"
          className="h-8 gap-1"
        >
          <LuPlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Manufacturer
          </span>
        </Button>
      </div>
      <div className="xl:col-span-2">
        <DataTable table={table} />
      </div>
      <DrawerDialog
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
        title="Manufacturer Action"
      >
        {getDialogContent()}
      </DrawerDialog>
    </>
  );
};

export default DashboardManufacturers;
