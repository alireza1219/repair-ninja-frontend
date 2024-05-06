import { ColumnDef } from "@tanstack/react-table";
import { Manufacturer } from "@/models/Manufacturer";

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
  onDelete: (manufacturer: Manufacturer) => void;
  onUpdate: (manufacturer: Manufacturer) => void;
}

export const getManufacturerColumns = ({
  onDelete,
  onUpdate,
}: ColumnActions): ColumnDef<Manufacturer>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const manufacturer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">
                Manage {manufacturer.name} Manufacturer
              </span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>
              Manufacturer ID: {manufacturer.id}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdate(manufacturer)}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(manufacturer)}
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
