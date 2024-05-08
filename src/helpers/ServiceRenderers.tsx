import { ServiceListItem } from "@/models/Service";
import {
  LuCheck,
  LuPackage,
  LuPackageCheck,
  LuPackageOpen,
} from "react-icons/lu";

export const StatusRenderer = (status: ServiceListItem["service_status"]) => {
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
};

export const LocalDateRenderer = (date: Date | string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
};

export const LocalDateTimeRenderer = (date: Date | string) => {
  const dateObject = new Date(date);
  return `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
};
