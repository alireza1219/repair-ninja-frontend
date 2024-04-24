import { BsWrenchAdjustableCircle, BsFillPersonFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FcServices } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

const HomePage = () => {
  return (
    <div className="flex flex-wrap md items-center h-screen">
      <div className="bg-white w-full md:w-1/2 h-screen flex items-center justify-center md:justify-start">
        <div className="mx-8 md:mx-32 text-center md:text-left">
          <div className="text-center md:text-left">
            <BsWrenchAdjustableCircle className="text-6xl md:text-6xl text-600 mb-8 md:mb-16 mx-auto md:ml-0" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 md:mt-16 mb-4 md:mb-8">
            Repair Ninja
          </h1>
          <div className="description w-full sm:md:w-2/3 mt-8 md:mt-16 text-500 text-lg">
            Your One-Stop Solution for Repair Management!
          </div>
          <Button asChild className="uppercase mt-5 text-sm font-semibold">
            <Link to={ROUTE_PATH.LOGIN}>
              Login
              <BsFillPersonFill className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="hidden md:block bg-slate-200 w-full md:w-1/2 h-screen relative">
        <FcServices className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px]" />
      </div>
    </div>
  );
};

export default HomePage;
