import { categoryColumns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import { Category, CategoryList } from "@/models/Category";
import {
  createCategory,
  deleteCategory,
  listCategory,
  updateCategory,
} from "@/services/Category";
import {
  PaginationState,
  RowData,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/DrawerDialog";
import { LuPlusCircle } from "react-icons/lu";
import { CategoryForm } from "./components/CategoryForm";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

type DialogModes = "create" | "update" | "delete" | null;

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onDelete: (id: number, title: string) => void;
    onUpdate: (id: number, title: string) => void;
  }
}

const DashboardCategories = () => {
  // Pagination state. Check out the PaginationState interface.
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogModes>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const getDialogContent = () => {
    switch (dialogMode) {
      case "create":
        return (
          <CategoryForm
            onSubmit={async (data) => {
              return useCategoryCreate.mutateAsync(data);
            }}
            isPending={useCategoryCreate.isPending}
          />
        );
      case "update":
        return (
          <CategoryForm
            onSubmit={async (data) => {
              return useCategoryUpdate.mutateAsync(data);
            }}
            isPending={useCategoryUpdate.isPending}
            isUpdate={true}
            initialData={{
              id: selectedCategory?.id,
              title: selectedCategory?.title!,
            }}
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
              disabled={useCategoryDelete.isPending}
              onClick={() =>
                useCategoryDelete.mutateAsync({
                  title: selectedCategory?.title!,
                  id: selectedCategory?.id,
                })
              }
            >
              {useCategoryDelete.isPending && (
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

  const useCategories = useQuery<CategoryList>({
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

  const useCategoryCreate = useMutation<Category, Error, Category>({
    mutationFn: async (category: Category) => {
      const response = await createCategory(category.title);
      return response.data;
    },
    onSuccess: (savedCategory, newCategory) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(
        `Successfully created the ${savedCategory.title} category.`
      );
      setOpen(false);
    },
  });

  const useCategoryUpdate = useMutation<Category, Error, Category>({
    mutationFn: async (category: Category) => {
      const response = await updateCategory(category.id!, category.title);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Successfully updated the category.");
      setOpen(false);
    },
  });

  const useCategoryDelete = useMutation<void, Error, Category>({
    mutationFn: async (category: Category) => {
      await deleteCategory(category.id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Successfully deleted the category.");
      setOpen(false);
    },
  });

  const table = useReactTable({
    columns: categoryColumns,
    data: useCategories.data?.results || [],
    // manualPagination must be set to true since we're using a server-side pagination.
    manualPagination: true,
    rowCount: useCategories.data?.count,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    meta: {
      onDelete(id, title) {
        setSelectedCategory({ id: id, title: title });
        setDialogMode("delete");
        setOpen(true);
      },
      onUpdate(id, title) {
        setSelectedCategory({ id: id, title: title });
        setDialogMode("update");
        setOpen(true);
      },
    },
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
