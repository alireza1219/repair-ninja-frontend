import { ServiceListItem } from "@/models/Service";
import { ColumnDef } from "@tanstack/react-table";
import { LocalDateTimeRenderer, StatusRenderer } from "@/helpers/ServiceRenderers";

export const DashboardServiceColumns: ColumnDef<ServiceListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const { customer } = row.original;
      const { first_name, last_name, username } = customer.user_profile;

      return (
        <>
          <div className="font-medium">
            {first_name && last_name ? `${first_name} ${last_name}` : username}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {customer.phone}
          </div>
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
];
