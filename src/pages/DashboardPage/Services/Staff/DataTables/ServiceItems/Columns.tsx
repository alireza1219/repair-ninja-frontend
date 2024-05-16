import { ColumnDef } from "@tanstack/react-table";
import { ServiceItem } from "@/models/ServiceItem";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LuMoreHorizontal,
  LuStickyNote,
  LuPenSquare,
  LuXCircle,
} from "react-icons/lu";

interface ColumnActions {
  onDelete: (serviceItem: ServiceItem) => void;
  onUpdate: (serviceItem: ServiceItem) => void;
  onView: (serviceItem: ServiceItem) => void;
}

export const getServiceItemColumns = ({
  onDelete,
  onUpdate,
  onView,
}: ColumnActions): ColumnDef<ServiceItem>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "serial_number",
    header: "S/N",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "manufacturer.name",
    header: "Manufacturer",
  },
  {
    accessorKey: "category.title",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const serviceItem = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">
                Open actions for {serviceItem.name}
              </span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => onView(serviceItem)}>
              <LuStickyNote className="mr-2 h-4 w-4" />
              Notes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdate(serviceItem)}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700"
              onClick={() => onDelete(serviceItem)}
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
