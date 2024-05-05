import { Category } from "@/models/Category";
import { DataTable } from "@/components/DataTable";
import { DialogModes } from "@/types/common";
import { getCategoryColumns } from "./Columns";
import { useCategories } from "@/hooks/categories/useCategories";
import { useCategoryCreate } from "@/hooks/categories/useCategoryCreate";
import { useCategoryUpdate } from "@/hooks/categories/useCategoryUpdate";
import { useCategoryDelete } from "@/hooks/categories/useCategoryDelete";
import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CategoryForm } from "./components/CategoryForm";
import { DrawerDialog } from "@/components/DrawerDialog";
import { LuPlusCircle } from "react-icons/lu";
import Spinner from "@/components/Spinner";

const DashboardCategories = () => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogModes>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const categoryColumns = getCategoryColumns({
    onDelete: (category) => tableActionHandler(category, "delete"),
    onUpdate: (category) => tableActionHandler(category, "update"),
  });

  // Mutation Success Handler.
  const onMutationSuccess = () => {
    setOpen(false);
  };
  // Table Action Handler.
  const tableActionHandler = (category: Category, mode: DialogModes) => {
    setSelectedCategory(category);
    setDialogMode(mode);
    setOpen(true);
  };
  // Dialog Content Generator.
  const getDialogContent = () => {
    switch (dialogMode) {
      case "create":
        return (
          <CategoryForm
            onSubmit={async (data) => {
              return createCategory.mutateAsync(data);
            }}
            isPending={createCategory.isPending}
          />
        );
      case "update":
        return (
          <CategoryForm
            onSubmit={async (data) => {
              return updateCategory.mutateAsync(data);
            }}
            isPending={updateCategory.isPending}
            initialData={selectedCategory!}
          />
        );
      case "delete":
        return (
          <div>
            <p>
              Are you sure you want to delete the {selectedCategory?.title}{" "}
              category with ID {selectedCategory?.id}?
            </p>
            <Button
              className="mt-6 w-full"
              variant="destructive"
              disabled={deleteCategory.isPending}
              onClick={() => deleteCategory.mutateAsync(selectedCategory!)}
            >
              {deleteCategory.isPending && (
                <Spinner className="mr-2" size={16} />
              )}
              Delete Category
            </Button>
          </div>
        );

      default:
        return <></>;
    }
  };

  // Category related hooks.
  const listCategories = useCategories(pagination);
  const createCategory = useCategoryCreate(onMutationSuccess);
  const updateCategory = useCategoryUpdate(onMutationSuccess);
  const deleteCategory = useCategoryDelete(onMutationSuccess);
  const table = useReactTable({
    columns: categoryColumns,
    data: listCategories.data?.results ?? [],
    // manualPagination must be set to true since we're using a server-side pagination.
    manualPagination: true,
    rowCount: listCategories.data?.count,
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
          <h1 className="text-lg font-semibold md:text-2xl">Categories List</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage Repair Ninja's Categories.
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
            Create Category
          </span>
        </Button>
      </div>
      <div className="xl:col-span-2">
        <DataTable table={table} />
      </div>
      <DrawerDialog
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
        title="Category Action"
      >
        {getDialogContent()}
      </DrawerDialog>
    </>
  );
};

export default DashboardCategories;
