import { apiClient } from "./apiClient";
import { CommonQueryParams } from "@/models/Request";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import {
  ServiceItem,
  ServiceItemList,
  ServiceItemPatchBody,
  ServiceItemPostBody,
} from "@/models/ServiceItem";

const getEndpoint = (id: number) => `core/services/${id}/items/`;

export const listServiceItems = async (
  id: number,
  params?: CommonQueryParams
) => {
  try {
    const response = await apiClient.get<ServiceItemList>(getEndpoint(id), {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const createServiceItem = async (
  id: number,
  data: ServiceItemPostBody
) => {
  try {
    const response = await apiClient.post<ServiceItemPostBody>(
      getEndpoint(id),
      data
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const retrieveServiceItem = async (
  serviceId: number,
  itemId: number
) => {
  try {
    const response = await apiClient.get<ServiceItem>(
      `${getEndpoint(serviceId)}${itemId}/`
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateServiceItem = async (
  serviceId: number,
  itemId: number,
  data: ServiceItemPatchBody
) => {
  try {
    const response = await apiClient.patch<ServiceItemPatchBody>(
      `${getEndpoint(serviceId)}${itemId}/`,
      data
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteServiceItem = async (serviceId: number, itemId: number) => {
  try {
    const response = await apiClient.delete<void>(
      `${getEndpoint(serviceId)}${itemId}/`
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
