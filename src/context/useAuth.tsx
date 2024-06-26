import React from "react";
import Spinner from "@/components/Spinner";

import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "@/services/User";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { login, verifyOtp } from "@/services/Auth";
import { toast } from "react-toastify";
import { TokenCreation } from "@/models/Auth";
import { ExtendedUserProfile, UserType } from "@/models/User";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  user: ExtendedUserProfile | null;
  loginUser: (username: string, password: string) => void;
  otpLogin: (email: string, otp: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  getType: () => UserType | undefined;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<ExtendedUserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response) {
          setUser(response?.data);
        }
      } finally {
        setIsReady(true);
      }
    };

    const accessToken = localStorage.getItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY
    );

    if (accessToken) {
      userProfile();
    } else {
      // This is necessary when access_token is not available inside the local storage.
      setIsReady(true);
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const loginResponse = await login(username, password);
      // Check for the request response before doing anything.
      if (loginResponse) {
        await onLoginSuccess(loginResponse.data);
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const otpLogin = async (email: string, otp: string) => {
    try {
      const otpResponse = await verifyOtp(email, otp);
      if (otpResponse) {
        await onLoginSuccess(otpResponse.data);
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const onLoginSuccess = async (response: TokenCreation) => {
    // TODO: A more secure approach to store both refresh + access tokens.
    // Store both refresh + access tokens in local storage.
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY, response.access);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY,
      response.refresh
    );
    const userProfileRes = await getUserProfile();
    if (userProfileRes) {
      setUser(userProfileRes.data);
    }
    toast.success("Welcome Back!");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const getType = () => {
    return user?.type;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY);
    setUser(null);
    // Clear the query cache on logout.
    queryClient.clear();
  };

  const value = {
    user: user,
    loginUser: loginUser,
    otpLogin: otpLogin,
    logout: logout,
    isLoggedIn: isLoggedIn,
    getType: getType,
  };

  return (
    <AuthContext.Provider value={value}>
      {isReady ? (
        children
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center">
          <Spinner size={80}></Spinner>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
