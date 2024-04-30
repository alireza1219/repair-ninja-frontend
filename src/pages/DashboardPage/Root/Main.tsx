// Hooks, Functions.
import { getServiceStatistics } from "@/services/Statistic";
import { getServiceList } from "@/services/Service";
import { Link } from "react-router-dom";
import { latestServicesColumns } from "./Columns";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { ROUTE_PATH } from "@/constants/RoutePath";
import { ServiceListItem } from "@/models/Service";
import { ServiceStatistics } from "@/models/Statistics";

// UI Elements, Components.
import { DashboardCard } from "@/components/DashboardCard";
import { Greetings } from "@/components/Greetings";
import { SimpleTable } from "@/components/SimpleTable";
import {
  LuPackage,
  LuCheck,
  LuPackageOpen,
  LuPackageCheck,
  LuArrowUpRight,
} from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardRoot = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ServiceStatistics>({});
  const [latestServices, setLatestServices] = useState<ServiceListItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      try {
        const serviceStatsResponse = await getServiceStatistics();
        if (serviceStatsResponse) {
          setStats(serviceStatsResponse.data);
        }

        const serviceListResponse = await getServiceList({ page_size: 5 });
        if (serviceListResponse) {
          setLatestServices(serviceListResponse.data.results);
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
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Services at a glance</CardTitle>
            <CardDescription>
              Quickly check the latest services from here.
            </CardDescription>
          </div>
          {isReady && latestServices.length !== 0 && (
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to={ROUTE_PATH.DASH_SERVICES}>
                All
                <LuArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {/* FIXME: overflow-x is not handled correctly in mobile phones. */}
          <SimpleTable
            data={latestServices}
            columns={latestServicesColumns}
            isLoading={!isReady}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardRoot;
