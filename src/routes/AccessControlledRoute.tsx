
import { RouterErrorHandler } from "@/components/RouterErrorHandler";
import { ROUTE_PATH } from "@/constants/RoutePath";
import { useAuth } from "@/context/useAuth";
import { UserType } from "@/models/User";

interface Props {
  children: React.ReactNode;
  allowedAccessLevels?: UserType[];
}

const AccessControlledRoute = ({ children, allowedAccessLevels }: Props) => {
  const { getType } = useAuth();
  const userType = getType();

  if (allowedAccessLevels && !allowedAccessLevels.includes(userType!)) {
    return (
      <RouterErrorHandler
        className="mt-10"
        url={`${ROUTE_PATH.HOME}/${ROUTE_PATH.DASHBOARD}`}
      />
    );
  }

  return <>{children}</>;
};

export default AccessControlledRoute;
