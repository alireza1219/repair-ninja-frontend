import { apiClient } from "./apiClient";
import { handleAxiosError } from "@/helpers/AxiosErrorHandler";
import { CommonQueryParams } from "@/models/Request";
import {
  BasicServiceList,
  Service,
  ServiceList,
  ServicePostBody,
  ServicePostResponse,
  ServiceUpdateBody,
} from "@/models/Service";

const ENDPOINT = "core/services/";

export const getServiceList = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<ServiceList>(ENDPOINT, {
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
    const response = await apiClient.get<BasicServiceList>(ENDPOINT, {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const createService = async (data: ServicePostBody) => {
  try {
    const response = await apiClient.post<ServicePostResponse>(ENDPOINT, data);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const retrieveService = async (id: number) => {
  try {
    const response = await apiClient.get<Service>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateService = async (id: number, data: ServiceUpdateBody) => {
  try {
    const response = await apiClient.patch<ServiceUpdateBody>(`${ENDPOINT}${id}/`, data);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteService = async (id: number) => {
  try {
    const response = await apiClient.delete<void>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
