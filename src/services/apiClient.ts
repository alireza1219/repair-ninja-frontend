import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshAccessToken, validateToken } from "./Auth";
import { LOCAL_STORAGE_KEYS } from "../constants/common";

export const apiClient = axios.create({
  // FIXME: Move this to environment variables instead of hard coding it.
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: A more secure approach to store the access token.
    const accessToken = localStorage.getItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY
    );

    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  async function (error) {
    const originalRequest = error.config;
    // TODO: A more secure approach to store the refresh token.
    const refreshToken = localStorage.getItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY
    );

    // The `error.response` property might be undefined under various situations (like an offline network), which causes a type error.
    // It's necessary to check for the response property definition rather than accessing its properties directly.
    if (refreshToken && error.response && error.response.status === 401) {
      const isValidToken = await validateToken(refreshToken);

      if (isValidToken && isValidToken.status === 200) {
        const response = await refreshAccessToken(refreshToken);
        const newAccessToken = response?.data.access;
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
          newAccessToken!
        );
        // The line below is not necessary at all! But I'm keeping it here for reference.
        // apiClient.defaults.headers.common["Authorization"] = `JWT ${newAccessToken}`;
        return apiClient(originalRequest);
      } else if (isValidToken && isValidToken.status === 401) {
        // Refresh token is expired. Cleanup the local storage.
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY);
      }
    }

    return Promise.reject(error);
  }
);
