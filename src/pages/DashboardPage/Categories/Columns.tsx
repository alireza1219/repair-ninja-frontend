import { Category } from "@/models/Category";
import { ColumnDef } from "@tanstack/react-table";

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

interface ColumnActions {
  onDelete: (category: Category) => void;
  onUpdate: (category: Category) => void;
}

// Original credits: https://github.com/TanStack/table/discussions/5312#discussioncomment-9252845
// For our case, using this approach is a cleaner alternative to table meta.
export const getCategoryColumns = ({
  onDelete,
  onUpdate,
}: ColumnActions): ColumnDef<Category>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    // For reference:
    // https://github.com/TanStack/table/blob/main/examples/react/editable-data/src/main.tsx
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
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
            <DropdownMenuItem onClick={() => onUpdate(category)}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update Title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(category)}
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
