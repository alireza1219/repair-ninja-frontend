import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";
import "./RouterErrorHandler.css";

type RouterErrorHandlerProps = {
  className?: string;
  status?: string;
  statusCode?: number;
  statusDetails?: string;
  url?: string;
};

const RouterErrorHandler = ({
  url,
  className,
  status = "Forbidden",
  statusCode = 403,
  statusDetails = "You don't have permission to access this page.",
}: RouterErrorHandlerProps) => {
  const hourFormatter = (input: number): Array<String> => {
    let inputStr = input.toString();
    if (inputStr.length > 3) {
      inputStr = inputStr.substring(0, 3);
    }
    return [inputStr[0], inputStr.substring(1)];
  };

  const statusCodeArray = hourFormatter(statusCode);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="clock">
        <span>{statusCodeArray[0]}</span>
        <span className="clock-is-ticking">:</span>
        <span>{statusCodeArray[1]}</span>
      </div>
      <h1 className="text-4xl font-bold mt-8">{status}</h1>
      <p className="text-lg mt-4">{statusDetails}</p>
      <Link to={url ?? `/${ROUTE_PATH.HOME}`}>
        <Button className="py-2 px-4 mt-8">Go Back</Button>
      </Link>
    </div>
  );
};

export { RouterErrorHandler };
