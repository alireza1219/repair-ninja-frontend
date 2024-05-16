import { ColumnDef } from "@tanstack/react-table";
import {
  LocalDateTimeRenderer,
  PriorityRenderer,
  StatusRenderer,
} from "@/helpers/ServiceRenderers";
import { ServiceListItem } from "@/models/Service";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LuArrowDown,
  LuArrowUp,
  LuArrowUpDown,
  LuMoreHorizontal,
  LuView,
  LuXCircle,
} from "react-icons/lu";

interface ColumnActions {
  onDelete: (service_id: number) => void;
  onView: (service_id: number) => void;
}

export const getStaffServiceColumns = ({
  onDelete,
  onView,
}: ColumnActions): ColumnDef<ServiceListItem>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {!column.getIsSorted() && (
            <LuArrowUpDown className="mr-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "asc" && (
            <LuArrowUp className="mr-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <LuArrowDown className="mr-2 h-4 w-4" />
          )}
          ID
        </Button>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const { customer } = row.original;
      const { first_name, last_name, username, email } = customer.user_profile;

      return (
        <>
          <div className="font-medium">
            {first_name && last_name ? `${first_name} ${last_name}` : username}
          </div>
          <div className="hidden text-sm text-muted-foreground md:block">
            {customer.phone}
          </div>
          {email && (
            <div className="hidden text-sm text-muted-foreground md:block">
              {email}
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "placed_at",
    header: "Placed At",
    cell: ({ row }) => {
      return LocalDateTimeRenderer(row.original.placed_at);
    },
  },
  {
    accessorKey: "service_status",
    header: "Status",
    cell: ({ row }) => {
      return StatusRenderer(row.original.service_status);
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {!column.getIsSorted() && (
            <LuArrowUpDown className="mr-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "asc" && (
            <LuArrowUp className="mr-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <LuArrowDown className="mr-2 h-4 w-4" />
          )}
          Priority
        </Button>
      );
    },
    cell: ({ row }) => {
      return PriorityRenderer(row.original.priority);
    },
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
                Open actions for service ID {serviceItem.id}
              </span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Service ID: {serviceItem.id}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView(serviceItem.id)}>
              <LuView className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700"
              onClick={() => onDelete(serviceItem.id)}
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
