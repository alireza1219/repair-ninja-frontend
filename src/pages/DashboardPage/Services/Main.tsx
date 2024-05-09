import { useAuth } from "@/context/useAuth";
import CustomerServices from "./Customers/CustomerServices";
import StaffServices from "./Staff/StaffServices";

const DashboardServices = () => {
  const { user } = useAuth();
  return (
    <>{user?.type === "regular" ? <CustomerServices /> : <StaffServices />}</>
  );
};

export default DashboardServices;
