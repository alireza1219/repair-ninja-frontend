import App from "@/App";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import LoginRedirectRoute from "./LoginRedirectRoute";
import ProtectedRoute from "./ProtectedRoute";

import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTE_PATH.HOME, element: <HomePage /> },
      {
        path: ROUTE_PATH.LOGIN,
        element: (
          <LoginRedirectRoute>
            <LoginPage />
          </LoginRedirectRoute>
        ),
      },
      {
        path: ROUTE_PATH.DASHBOARD,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
