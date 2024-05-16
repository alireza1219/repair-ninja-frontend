import { AxiosError } from "axios";
import { useServiceRetrieve } from "@/hooks/services/useServiceRetrieve";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

import CustomerInfoCard from "@/components/Cards/CustomerInfoCard";
import NavigationButton from "@/components/NavigationButton";
import ServiceInfoCard from "@/components/Cards/ServiceInfoCard";
import ServiceItemsTable from "./DataTables/ServiceItems/ServiceItemsTable";
import ServiceStatusCards from "@/components/Cards/ServiceStatusCards";
import Spinner from "@/components/Spinner";
import { AddServiceItem } from "./Forms/AddServiceItem";
import { LocalDateTimeRenderer } from "@/helpers/ServiceRenderers";
import { RouterErrorHandler } from "@/components/RouterErrorHandler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateServiceForm } from "./Forms/UpdateService";

type tabs = "overview" | "addItems" | "items" | "update";

const RetrieveService = () => {
  const [tab, setTab] = useState<tabs>("overview");
  // For reference:
  // https://github.com/remix-run/react-router/issues/8498
  const { ticker } = useParams();
  const CurrentService = useServiceRetrieve(parseInt(ticker!), {
    retry: false,
  });

  if (CurrentService.isLoading || CurrentService.isFetching) {
    return (
      <div className="flex flex-row justify-center items-center h-full">
        <Spinner size={50}></Spinner>
      </div>
    );
  }

  if (CurrentService.isError) {
    const error = CurrentService.error;
    if (error instanceof AxiosError) {
      return (
        <RouterErrorHandler
          status={error.response?.status === 404 ? "Not Found" : error.code}
          statusCode={error.response?.status}
          statusDetails={
            error.response?.status === 404
              ? "The service you were looking for does not exist!"
              : error.message
          }
          url={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}`}
        />
      );
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grid gap-1">
          <h1 className="text-lg font-semibold md:text-2xl">
            Service #{CurrentService.data!.id}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last update:{" "}
            {LocalDateTimeRenderer(CurrentService.data!.last_update)}
          </p>
        </div>
        <NavigationButton
          to={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}`}
          className="h-8 gap-1"
        />
      </div>
      <Tabs
        value={tab}
        onValueChange={(value: string) => setTab(value as typeof tab)}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="addItems">Add Items</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col flex-1 gap-4 lg:gap-6 pt-3">
            <ServiceStatusCards data={CurrentService.data!} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              <CustomerInfoCard data={CurrentService.data!.customer} />
              <ServiceInfoCard
                className="lg:col-span-2"
                data={CurrentService.data!}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="addItems">
          <div className="pt-3">
            <AddServiceItem serviceId={parseInt(ticker!)} />
          </div>
        </TabsContent>
        <TabsContent value="items">
          <div className="pt-3">
            <ServiceItemsTable serviceId={parseInt(ticker!)} />
          </div>
        </TabsContent>
        <TabsContent value="update">
          <div className="pt-3">
            <UpdateServiceForm
              defaultValues={CurrentService.data!}
              serviceId={parseInt(ticker!)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default RetrieveService;
