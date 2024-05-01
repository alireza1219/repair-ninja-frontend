import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/useAuth";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer position="bottom-right" hideProgressBar stacked />
    </AuthProvider>
  );
}

export default App;
