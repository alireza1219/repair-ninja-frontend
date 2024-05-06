import { apiClient } from "./apiClient";
import { CommonQueryParams } from "@/models/Request";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import { Manufacturer, ManufacturerList } from "@/models/Manufacturer";

const ENDPOINT = "core/manufacturers/";

export const listManufacturer = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<ManufacturerList>(ENDPOINT, {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const createManufacturer = async (name: string) => {
  try {
    const data = { name: name };

    const response = await apiClient.post<Manufacturer>(ENDPOINT, data);

    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const retrieveManufacturer = async (id: number) => {
  try {
    const response = await apiClient.get<Manufacturer>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateManufacturer = async (id: number, newName: string) => {
  try {
    const data = { name: newName };

    const response = await apiClient.put<Manufacturer>(
      `${ENDPOINT}${id}/`,
      data
    );

    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteManufacturer = async (id: number) => {
  try {
    const response = await apiClient.delete<void>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
