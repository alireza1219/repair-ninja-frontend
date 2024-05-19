import { ColumnDef } from "@tanstack/react-table";
import { Repairman } from "@/models/Repairman";

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
  onDelete: (repairman: Repairman) => void;
  onPhoneUpdate: (repairman: Repairman) => void;
  onProfileUpdate: (repairman: Repairman) => void;
}

export const getRepairmanColumns = ({
  onDelete,
  onPhoneUpdate,
  onProfileUpdate,
}: ColumnActions): ColumnDef<Repairman>[] => [
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
      const repairman = row.original;
      const {
        user_profile: { id, first_name, last_name, username },
      } = repairman;
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
            <DropdownMenuItem onClick={() => onProfileUpdate(repairman)}>
              <LuPenSquare className="mr-2 h-4 w-4" />
              Update Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onPhoneUpdate(repairman)}>
              <LuPhone className="mr-2 h-4 w-4" />
              Update Phone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(repairman)}
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
