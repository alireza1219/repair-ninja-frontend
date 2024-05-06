import App from "@/App";
import AccessControlledRoute from "./AccessControlledRoute";
import DashboardBase from "@/pages/DashboardPage/Base";
import DashboardCategories from "@/pages/DashboardPage/Categories/Main";
import DashboardManufacturers from "@/pages/DashboardPage/Manufacturers/Main";
import DashboardRoot from "@/pages/DashboardPage/Root/Main";
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
            <DashboardBase />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <DashboardRoot />,
          },
          {
            path: ROUTE_PATH.DASH_CUSTOMERS,
            element: (
              <AccessControlledRoute
                allowedAccessLevels={["staff", "superuser"]}
              >
                <p>This is customers page.</p>
              </AccessControlledRoute>
            ),
          },
          {
            path: ROUTE_PATH.DASH_REPAIRMEN,
            element: (
              <AccessControlledRoute
                allowedAccessLevels={["staff", "superuser"]}
              >
                <p>This is repairmen page.</p>
              </AccessControlledRoute>
            ),
          },
          {
            path: ROUTE_PATH.DASH_CATEGORIES,
            element: (
              <AccessControlledRoute
                allowedAccessLevels={["staff", "superuser"]}
              >
                <DashboardCategories />
              </AccessControlledRoute>
            ),
          },
          {
            path: ROUTE_PATH.DASH_MANUFACTURERS,
            element: (
              <AccessControlledRoute
                allowedAccessLevels={["staff", "superuser"]}
              >
                <DashboardManufacturers />
              </AccessControlledRoute>
            ),
          },
          {
            path: ROUTE_PATH.DASH_SERVICES,
            element: <p>This is services page.</p>,
          },
        ],
      },
    ],
  },
]);
