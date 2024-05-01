import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./routes/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </React.StrictMode>
);
