import { DashboardCard } from "@/components/DashboardCard";
import { Greetings } from "@/components/Greetings";
import { getServiceStatistics } from "@/services/DashboardStatisticsService";
import { getServiceList } from "@/services/Service";
import { useAuth } from "@/context/useAuth";
import { ServiceListItem } from "@/models/Service";
import { ServiceStatistics } from "@/models/Statistics";
import {
  TableColumn,
  DashboardSimpleTable,
} from "@/components/DashboardSimpleTable";
import { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

// FIXME: Currently crashes the whole app if you login using a regular customer account.
// And it can't be fixed until I define the access permissions on the useAuth hook.
const latestServicesTableConfig: TableColumn<ServiceListItem>[] = [
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
          <DashboardSimpleTable
            data={latestServices}
            columns={latestServicesTableConfig}
            isLoading={!isReady}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardRoot;
