import { ColumnDef, RowData } from "@tanstack/react-table";
import { Category } from "@/models/Category";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal, LuPenSquare, LuXCircle } from "react-icons/lu";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onDelete: (id: number, title: string) => void;
    onUpdate: (id: number, title: string) => void;
  }
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    // For reference:
    // https://github.com/TanStack/table/blob/main/examples/react/editable-data/src/main.tsx
    id: "actions",
    cell: ({ row, table }) => {
      const category = row.original;

      const updateHandler = () => {
        table.options.meta?.onUpdate(category.id!, category.title);
      };

      const deleteHandler = () => {
        table.options.meta?.onDelete(category.id!, category.title);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Manage {category.title} Category</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Category ID: {category.id}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={updateHandler}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update Title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={deleteHandler}
              className="text-red-600 focus:text-red-700"
            >
              <LuXCircle className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
