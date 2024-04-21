import React from "react";
import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/UserService";
import { LOCAL_STORAGE_KEYS } from "../constants/common";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";
import { UserProfile } from "../models/User";

type AuthContextType = {
  user: UserProfile | null;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userProfile = async () => {
      const response = await getUserProfile();
      if (response) {
        setUser(response?.data);
      }
    };

    const accessToken = localStorage.getItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY
    );

    if (accessToken) {
      userProfile();
    }

    setIsReady(true);
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const loginResponse = await login(username, password);

      // Check for the request response before doing anything.
      if (loginResponse) {
        // TODO: A more secure approach to store both refresh + access tokens.
        // Store both refresh + access tokens in local storage.
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
          loginResponse.data.access
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY,
          loginResponse.data.refresh
        );
        const userProfileRes = await getUserProfile();
        if (userProfileRes) {
          setUser(userProfileRes.data);
        }
        toast.success("Successfully logged in! Redirecting...");
        // TODO: useNavigate to redirect to the dashboard.
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY);
    setUser(null);
  };

  const value = {
    user: user,
    loginUser: loginUser,
    logout: logout,
    isLoggedIn: isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
