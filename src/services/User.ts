import { apiClient } from "./apiClient";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import { UserProfile } from "../models/User";

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get<UserProfile>("auth/users/me/");
    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};
