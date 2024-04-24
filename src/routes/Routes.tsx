import App from "@/App";
import { ROUTE_PATH } from "@/constants/RoutePath";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";
import HomePage from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTE_PATH.HOME, element: <HomePage /> },
      { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATH.DASHBOARD, element: <DashboardPage /> },
    ],
  },
]);
