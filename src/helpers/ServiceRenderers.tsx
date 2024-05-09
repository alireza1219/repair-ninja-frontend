import { ServiceListItem } from "@/models/Service";
import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUp,
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

export const PriorityRenderer = (priority: number) => {
  if (priority < 5) {
    return (
      <div className="flex w-[100px] items-center">
        <LuArrowDown className="mr-2 h-4 w-4" />
        Low
      </div>
    );
  } else if (priority === 5) {
    return (
      <div className="flex w-[100px] items-center">
        <LuArrowRight className="mr-2 h-4 w-4" />
        Medium
      </div>
    );
  }
  return (
    <div className="flex w-[100px] items-center">
      <LuArrowUp className="mr-2 h-4 w-4" />
      High
    </div>
  );
};

export const LocalDateRenderer = (date: Date | string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
};

export const LocalDateTimeRenderer = (date: Date | string) => {
  const dateObject = new Date(date);
  return `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
};
