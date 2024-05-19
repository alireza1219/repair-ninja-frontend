import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/models/Customer";

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
  LuMoreHorizontal,
  LuPenSquare,
  LuPhone,
  LuXCircle,
} from "react-icons/lu";

interface ColumnActions {
  onDelete: (customer: Customer) => void;
  onPhoneUpdate: (customer: Customer) => void;
  onProfileUpdate: (customer: Customer) => void;
}

export const getCustomerColumns = ({
  onDelete,
  onPhoneUpdate,
  onProfileUpdate,
}: ColumnActions): ColumnDef<Customer>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user_profile.first_name",
    header: "First Name",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "user_profile.last_name",
    header: "Last Name",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "user_profile.username",
    header: "Username",
  },
  {
    accessorKey: "user_profile.email",
    header: "Email",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const {
        user_profile: { id, first_name, last_name, username },
      } = customer;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">
                Manage{" "}
                {first_name && last_name
                  ? `${first_name} ${last_name}`
                  : username}
              </span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Profile ID: {id}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onProfileUpdate(customer)}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onPhoneUpdate(customer)}>
              <LuPhone className="mr-2 h-4 w-4" />
              Update Phone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(customer)}
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
