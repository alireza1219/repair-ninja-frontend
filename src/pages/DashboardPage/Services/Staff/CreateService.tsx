import { Button } from "@/components/ui/button";
import { CreateServiceForm } from "./Forms/CreateServiceForm";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { ROUTE_PATH } from "@/constants/RoutePath";

const CreateService = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="grid gap-1">
          <h1 className="text-lg font-semibold md:text-2xl">Create a New Service</h1>
        </div>
        <Link to={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}`}>
          <Button size="sm" className="h-8 gap-1">
            <LuArrowLeft className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Go Back
            </span>
          </Button>
        </Link>
      </div>
      <CreateServiceForm />
    </>
  );
};

export default CreateService;
