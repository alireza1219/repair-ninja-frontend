import AuthPlayground from "./components/AuthPlayground";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/useAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <AuthPlayground />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
