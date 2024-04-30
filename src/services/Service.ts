import { apiClient } from "./apiClient";
import { handleAxiosError } from "@/helpers/AxiosErrorHandler";
import { CommonQueryParams } from "@/models/Request";
import { ServiceList } from "@/models/Service";

export const getServiceList = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<ServiceList>("core/services/", {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};
