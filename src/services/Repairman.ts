import { apiClient } from "./apiClient";
import {
  Repairman,
  RepairmanList,
  RepairmanPatchBody,
  RepairmanPostBody,
} from "@/models/Repairman";
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

export const createRepairman = async (data: RepairmanPostBody) => {
  try {
    const response = await apiClient.post<Repairman>(ENDPOINT, data);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateRepairman = async (id: number, data: RepairmanPatchBody) => {
  try {
    const response = await apiClient.patch<RepairmanPatchBody>(
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
