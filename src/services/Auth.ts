import { apiClient } from "./apiClient";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import {
  OtpRequestResponse,
  TokenCreation,
  TokenRenewal,
} from "../models/Auth";
import { AxiosRequestConfig } from "axios";

export const login = async (username: string, password: string) => {
  try {
    const data = {
      username: username,
      password: password,
    };

    const response = await apiClient.post<TokenCreation>(
      "auth/jwt/create/",
      data
    );

    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const data = { refresh: refreshToken };

    const response = await apiClient.post<TokenRenewal>(
      "auth/jwt/refresh/",
      data
    );

    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};

export const validateToken = async (token: string) => {
  try {
    const data = { token: token };
    const config: AxiosRequestConfig = { validateStatus: null };

    // Manually handle the status validation when using this validator:
    // A 200 HTTP response means that token is still valid.
    // A 401 HTTP response means that token has expired or not valid.
    // The response interceptor's error handler was causing a loop, so I set validateStatus to null to avoid this issue.
    const response = await apiClient.post("auth/jwt/verify/", data, config);

    return response;
  } catch (error: any) {
    // I believe the catch block here is not going to catch anything.
    handleAxiosError(error);
  }
};

export const requestOtp = async (email: string) => {
  try {
    const data = { email: email };

    const response = await apiClient.post<OtpRequestResponse>("otp/email/", data);

    return response;
  } catch (error: any) {
    handleAxiosError(error);
    // Triggers the catch block on the other side.
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const data = { email: email, otp: otp };

    const response = await apiClient.post<TokenCreation>("otp/email/verify/", data);

    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
};
