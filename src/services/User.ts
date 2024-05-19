import { apiClient } from "./apiClient";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import {
  ExtendedUserProfile,
  UserProfile,
  UserProfileDelete,
  UserProfilePatch,
  UserProfilePost,
} from "../models/User";

const ENDPOINT = "auth/users/";

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get<ExtendedUserProfile>(`${ENDPOINT}me/`);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};

export const createUser = async (data: UserProfilePost) => {
  try {
    const response = await apiClient.post<UserProfile>(ENDPOINT, data);
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateUser = async (user_id: number, data: UserProfilePatch) => {
  try {
    const response = await apiClient.patch<UserProfile>(
      `${ENDPOINT}${user_id}/`,
      data
    );
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteUser = async (user_id: number, data: UserProfileDelete) => {
  try {
    const response = await apiClient.delete<void>(`${ENDPOINT}${user_id}/`, {
      data: data,
    });
    return response;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
