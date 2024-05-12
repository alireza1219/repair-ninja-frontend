import { apiClient } from "./apiClient";
import { RepairmanList } from "@/models/Repairman";
import { CommonQueryParams } from "@/models/Request";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";

const ENDPOINT = "core/repairmen/";

export const listRepairman = async (params?: CommonQueryParams) => {
  try {
    const response = await apiClient.get<RepairmanList>(ENDPOINT, {
      params: { ...params },
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const loadRepairmenAsOptions = (
  // TODO: Debouncing the input.
  inputValue: string,
  callback: (options: any) => void
) => {
  listRepairman({ search: inputValue ? inputValue : "" }).then((response) => {
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
