import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/useAuth";
import { LoginPage } from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <AuthProvider>
        <LoginPage />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
