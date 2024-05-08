import { apiClient } from "./apiClient";
import { handleAxiosError } from "@/helpers/AxiosErrorHandler";
import { CommonQueryParams } from "@/models/Request";
import { BasicServiceList, ServiceList } from "@/models/Service";

export const getServiceList = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<ServiceList>("core/services/", {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const getBasicServiceList = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<BasicServiceList>("core/services/", {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
