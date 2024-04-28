import { apiClient } from "./apiClient";
import { handleAxiosError } from "@/helpers/AxiosErrorHandler";
import { ServiceList } from "@/models/Service";

type ServiceRequestParams = {
  page?: number;
  page_size?: number;
};

export const getServiceList = async (params?: ServiceRequestParams) => {
  try {
    const response = await apiClient.get<ServiceList>("core/services/", {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};
