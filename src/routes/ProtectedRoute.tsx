import React from "react";

import { useAuth } from "@/context/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  // https://reactrouter.com/en/6.23.0/components/navigate
  // https://reactrouter.com/en/6.23.0/hooks/use-navigate

  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={`/${ROUTE_PATH.LOGIN}`} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
