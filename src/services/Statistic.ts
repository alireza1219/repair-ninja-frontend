import { apiClient } from "./apiClient";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import { ServiceStatistics } from "@/models/Statistics";

export const getServiceStatistics = async () => {
  try {
    const response = await apiClient.get<ServiceStatistics>("core/service-statistics/");
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
