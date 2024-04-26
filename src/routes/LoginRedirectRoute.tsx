import React from "react";

import { useAuth } from "@/context/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

type Props = {
  children: React.ReactNode;
};

const LoginRedirectRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const from = location.state?.from?.pathname || `/${ROUTE_PATH.DASHBOARD}`;

  return isLoggedIn() ? (
    <Navigate to={from} replace />
  ) : (
    <>{children}</>
  );
};

export default LoginRedirectRoute;
