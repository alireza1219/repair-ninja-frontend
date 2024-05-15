import { AxiosError } from "axios";
import { useServiceRetrieve } from "@/hooks/services/useServiceRetrieve";
import { useParams } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

import NavigationButton from "@/components/NavigationButton";
import Spinner from "@/components/Spinner";
import { RouterErrorHandler } from "@/components/RouterErrorHandler";

const RetrieveService = () => {
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
    console.log(error);
    if (error instanceof AxiosError) {
      return (
        <RouterErrorHandler
          status={error.code}
          statusCode={error.response?.status}
          statusDetails={error.message}
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
        </div>
        <NavigationButton
          to={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}`}
          className="h-8 gap-1"
        />
      </div>
    </>
  );
};

export default RetrieveService;
