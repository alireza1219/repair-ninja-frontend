import { apiClient } from "./apiClient";
import {
  Customer,
  CustomerList,
  CustomerPatchBody,
  CustomerPostBody,
} from "@/models/Customer";
import { CommonQueryParams } from "@/models/Request";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";

const ENDPOINT = "core/customers/";

export const listCustomer = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<CustomerList>(ENDPOINT, {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const createCustomer = async (data: CustomerPostBody) => {
  try {
    const response = await apiClient.post<Customer>(ENDPOINT, data);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateCustomer = async (id: number, data: CustomerPatchBody) => {
  try {
    const response = await apiClient.patch<CustomerPatchBody>(
      `${ENDPOINT}${id}/`,
      data
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const checkPhoneAvailability = async (phone: string) => {
  try {
    const data = { phone: phone };
    const response = await apiClient.post<{ phone?: string }>(
      `${ENDPOINT}phone_availability/`,
      data
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const loadCustomersAsOptions = (
  // TODO: Debouncing the input.
  inputValue: string,
  callback: (options: any) => void
) => {
  listCustomer({ search: inputValue ? inputValue : "" }).then((response) => {
    callback(
      response.data?.results.map(
        ({ id, user_profile: { first_name, last_name, username } }) => ({
          value: id,
          label:
            first_name && last_name ? `${first_name} ${last_name}` : username,
        })
      )
    );
  });
};
