import { BasicServiceTable } from "./Customers/BasicServiceTable";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";
import { ServiceTable } from "./Staff/ServiceTable";
import { useAuth } from "@/context/useAuth";
import { useDashboardStatistics } from "@/hooks/useStatistics";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Greetings } from "@/components/Greetings";
import { LuArrowUpRight } from "react-icons/lu";
import { StatisticCards } from "./Common/StatisticCards";

const DashboardRoot = () => {
  const { user } = useAuth();
  const stats = useDashboardStatistics();

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
        <StatisticCards stats={stats?.data} isLoading={stats.isFetching} />
      </div>
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>
              {user?.type === "regular"
                ? "Your Latest Services"
                : "Services At A Glance"}
            </CardTitle>
            <CardDescription>
              Discover the most recent services from here.
            </CardDescription>
          </div>

          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to={ROUTE_PATH.DASH_SERVICES}>
              All
              <LuArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {user?.type === "regular" ? BasicServiceTable() : ServiceTable()}
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardRoot;
