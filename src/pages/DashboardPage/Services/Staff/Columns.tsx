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
import { LuMoreHorizontal, LuTerminal } from "react-icons/lu";

export const getStaffServiceColumns: ColumnDef<ServiceListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    header: "Priority",
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
            <DropdownMenuItem onClick={() => console.log(serviceItem)}>
              <LuTerminal className="mr-2 h-4 w-4" />
              Console Logger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
