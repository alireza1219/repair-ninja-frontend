import { AxiosError } from "axios";
import { useRetrieveService } from "@/hooks/services/useRetrieveService";
import { useParams } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

import Spinner from "@/components/Spinner";
import { RouterErrorHandler } from "@/components/RouterErrorHandler";

const RetrieveService = () => {
  const { ticker } = useParams();
  const CurrentService = useRetrieveService(parseInt(ticker!), {
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
    <div>
      {CurrentService.data ? CurrentService.data.service_status : "Not found"}
    </div>
  );
};

export default RetrieveService;
