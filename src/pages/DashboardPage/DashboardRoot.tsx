import { DashboardCard } from "@/components/DashboardCard";
import { Greetings } from "@/components/Greetings";
import { useAuth } from "@/context/useAuth";
import { ServiceStatistics } from "@/models/Statistics";
import { getServiceStatistics } from "@/services/DashboardStatisticsService";
import { useEffect, useState } from "react";
import {
  LuPackage,
  LuCheck,
  LuPackageOpen,
  LuPackageCheck,
} from "react-icons/lu";

const DashboardRoot = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ServiceStatistics>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await getServiceStatistics();
        if (response) {
          setStats(response.data);
        }
      } finally {
        setIsReady(true);
      }
    };

    getStats();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          <Greetings
            name={user?.first_name ? user.first_name : user?.username}
          />
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <DashboardCard
          icon={LuPackage}
          title="Services Received"
          subtitle={stats.R ? stats.R : 0}
          isLoading={!isReady}
        />
        <DashboardCard
          icon={LuPackageOpen}
          title="Services In Progress"
          subtitle={stats.I ? stats.I : 0}
          isLoading={!isReady}
        />
        <DashboardCard
          icon={LuPackageCheck}
          title="Services Completed"
          subtitle={stats.C ? stats.C : 0}
          isLoading={!isReady}
        />
        <DashboardCard
          icon={LuCheck}
          title="Services Delivered"
          subtitle={stats.D ? stats.D : 0}
          isLoading={!isReady}
        />
      </div>
    </>
  );
};

export default DashboardRoot;
