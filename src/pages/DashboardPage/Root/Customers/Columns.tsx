import { BasicServiceListItem } from "@/models/Service";
import { ColumnDef } from "@tanstack/react-table";
import { LocalDateRenderer, StatusRenderer } from "@/helpers/ServiceRenderers";

export const DashboardBasicServiceColumns: ColumnDef<BasicServiceListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "estimation_delivery",
    header: "Estimation Delivery",
    cell: ({ row }) => {
      const currentItem = row.original;
      // FIXME: Not a good practice to hard code service status keys here.
      if (currentItem.service_status == "D") {
        return `Delivered on ${LocalDateRenderer(currentItem.last_update)}`;
      }
      return LocalDateRenderer(currentItem.estimation_delivery);
    },
  },
  {
    accessorKey: "service_status",
    header: "Status",
    cell: ({ row }) => {
      return StatusRenderer(row.original.service_status);
    },
  },
];
