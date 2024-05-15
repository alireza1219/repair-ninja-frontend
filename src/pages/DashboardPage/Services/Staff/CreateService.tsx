import NavigationButton from "@/components/NavigationButton";

import { AddServiceForm } from "./Forms/AddService";
import { ROUTE_PATH } from "@/constants/RoutePath";

const CreateService = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grid gap-1">
          <h1 className="text-lg font-semibold md:text-2xl">
            Create a New Service
          </h1>
        </div>
        <NavigationButton
          to={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}`}
          className="h-8 gap-1"
        />
      </div>
      <AddServiceForm />
    </>
  );
};

export default CreateService;
