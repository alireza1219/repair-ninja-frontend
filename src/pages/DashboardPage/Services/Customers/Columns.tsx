import { BasicServiceListItem } from "@/models/Service";
import { ColumnDef } from "@tanstack/react-table";
import {
  LocalDateRenderer,
  LocalDateTimeRenderer,
  StatusRenderer,
} from "@/helpers/ServiceRenderers";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal, LuScrollText } from "react-icons/lu";

interface ColumnActions {
  viewDescription: (serviceItem: BasicServiceListItem) => void;
}

export const getServiceColumns = ({
  viewDescription,
}: ColumnActions): ColumnDef<BasicServiceListItem>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "placed_at",
    header: "Placed At",
    cell: ({ row }) => {
      return LocalDateTimeRenderer(row.original.placed_at);
    },
  },
  {
    accessorKey: "last_update",
    header: "Last Update",
    cell: ({ row }) => {
      return LocalDateTimeRenderer(row.original.last_update);
    },
  },
  {
    accessorKey: "estimation_delivery",
    header: "ETA",
    cell: ({ row }) => {
      return LocalDateRenderer(row.original.estimation_delivery);
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
            <DropdownMenuItem onClick={() => viewDescription(serviceItem)}>
              <LuScrollText className="mr-2 h-4 w-4" />
              Description
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
