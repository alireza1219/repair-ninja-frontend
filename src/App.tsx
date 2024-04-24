import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/useAuth";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
