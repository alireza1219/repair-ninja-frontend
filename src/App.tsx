import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
