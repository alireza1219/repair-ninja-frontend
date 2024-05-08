import { ServiceStatistics } from "@/models/Statistics";

import { DashboardCard } from "@/components/DashboardCard";
import {
  LuPackage,
  LuCheck,
  LuPackageOpen,
  LuPackageCheck,
} from "react-icons/lu";

type Props = {
  stats?: ServiceStatistics;
  isLoading: boolean;
};

const StatisticCards = ({ stats, isLoading }: Props) => {
  return (
    <>
      <DashboardCard
        icon={LuPackage}
        title="Services Received"
        subtitle={stats?.R ?? 0}
        isLoading={isLoading}
      />
      <DashboardCard
        icon={LuPackageOpen}
        title="Services In Progress"
        subtitle={stats?.I ?? 0}
        isLoading={isLoading}
      />
      <DashboardCard
        icon={LuPackageCheck}
        title="Services Completed"
        subtitle={stats?.C ?? 0}
        isLoading={isLoading}
      />
      <DashboardCard
        icon={LuCheck}
        title="Services Delivered"
        subtitle={stats?.D ?? 0}
        isLoading={isLoading}
      />
    </>
  );
};

export { StatisticCards };
