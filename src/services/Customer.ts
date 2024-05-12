import { apiClient } from "./apiClient";
import { CustomerList } from "@/models/Customer";
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
