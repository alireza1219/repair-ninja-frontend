import { ServiceListItem } from "@/models/Service";

import {
  LuPackage,
  LuCheck,
  LuPackageOpen,
  LuPackageCheck,
} from "react-icons/lu";
import { TableColumn } from "@/components/SimpleTable";

// FIXME: Currently crashes the whole app if you login using a regular customer account.
// And it can't be fixed until I define the access permissions on the useAuth hook.
export const latestServicesColumns: TableColumn<ServiceListItem>[] = [
  {
    label: "ID",
    render: (item) => item.id,
  },
  {
    label: "Customer",
    render: (item) => {
      return (
        <>
          <div className="font-medium">
            {item.customer.user_profile.first_name &&
            item.customer.user_profile.last_name
              ? `${item.customer.user_profile.first_name} ${item.customer.user_profile.last_name}`
              : item.customer.user_profile.username}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item.customer.phone}
          </div>
        </>
      );
    },
  },
  {
    label: "Date",
    render: (item) => {
      const date = new Date(item.placed_at);
      return date.toLocaleDateString();
    },
  },
  {
    label: "Status",
    render: (item) => {
      const status = item.service_status;
      const dict = {
        R: (
          <div className="flex w-[100px] items-center">
            <LuPackage className="mr-2 h-4 w-4" />
            Received
          </div>
        ),
        I: (
          <div className="flex w-[100px] items-center">
            <LuPackageOpen className="mr-2 h-4 w-4" />
            In Progress
          </div>
        ),
        C: (
          <div className="flex w-[100px] items-center">
            <LuPackageCheck className="mr-2 h-4 w-4" />
            Completed
          </div>
        ),
        D: (
          <div className="flex w-[100px] items-center">
            <LuCheck className="mr-2 h-4 w-4" />
            Delivered
          </div>
        ),
      };
      return dict[status];
    },
  },
];
