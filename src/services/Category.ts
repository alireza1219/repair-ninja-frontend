import { apiClient } from "./apiClient";
import { CategoryList, Category } from "@/models/Category";
import { CommonQueryParams } from "@/models/Request";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";

const ENDPOINT = "core/categories/";

export const listCategory = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<CategoryList>(ENDPOINT, {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const createCategory = async (title: string) => {
  try {
    const data = { title: title };

    const response = await apiClient.post<Category>(ENDPOINT, data);

    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const retrieveCategory = async (id: number) => {
  try {
    const response = await apiClient.get<Category>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateCategory = async (id: number, newTitle: string) => {
  try {
    const data = { title: newTitle };

    const response = await apiClient.put<Category>(`${ENDPOINT}${id}/`, data);

    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await apiClient.delete<void>(`${ENDPOINT}${id}/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
