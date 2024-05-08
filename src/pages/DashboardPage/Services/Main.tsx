import { useAuth } from "@/context/useAuth";
import CustomerServices from "./Customers/CustomerServices";

const DashboardServices = () => {
  const { user } = useAuth();
  return (
    <>
      {user?.type === "regular" ? (
        <CustomerServices />
      ) : (
        <p>Staff services has not implemented yet :D!</p>
      )}
    </>
  );
};

export default DashboardServices;
