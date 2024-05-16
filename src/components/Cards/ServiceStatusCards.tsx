import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LocalDateRenderer,
  LocalDateTimeRenderer,
} from "@/helpers/ServiceRenderers";
import { Service } from "@/models/Service";
import { differenceInDays, formatDistanceToNow, isBefore } from "date-fns";
import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUp,
  LuCalendarCheck,
  LuCheck,
  LuPackage,
  LuPackageCheck,
  LuPackageOpen,
} from "react-icons/lu";

interface Props {
  data: Service;
}

const EstimatedCompletionCard = (
  service_status: Service["service_status"],
  estimation_delivery: string,
  placed_at: string
) => {
  let message = "Time's up!";
  let progressValue = 100;
  const today = new Date();

  if (isBefore(today, estimation_delivery)) {
    const daysDiff = differenceInDays(estimation_delivery, today);
    const totalDays = differenceInDays(estimation_delivery, placed_at);
    progressValue = Math.max(
      0,
      Math.min(100, 100 - (daysDiff / totalDays) * 100)
    );
    message = formatDistanceToNow(estimation_delivery, { addSuffix: true });
  }

  if (["C", "D"].includes(service_status)) {
    message = "Already Completed!";
    progressValue = 100;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Estimated Completion Time</CardDescription>
        <CardTitle className="text-xl">
          {LocalDateRenderer(estimation_delivery)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{message}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} />
      </CardFooter>
    </Card>
  );
};

const StatusCard = (status: Service["service_status"], size?: string) => {
  const dictionary = {
    R: ["Received", <LuPackage className={size} />],
    I: ["In Progress", <LuPackageOpen className={size} />],
    C: ["Completed", <LuPackageCheck className={size} />],
    D: ["Delivered", <LuCheck className={size} />],
  };

  return (
    <Card className="grid">
      <CardHeader className="pb-0">
        <CardDescription>Current Status</CardDescription>
      </CardHeader>
      <CardContent className="font-medium text-2xl">
        {dictionary[status][0]}
      </CardContent>
      <CardFooter>{dictionary[status][1]}</CardFooter>
    </Card>
  );
};

const PlacedAtCard = (placed_at: string) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Placed At</CardDescription>
        <CardTitle className="text-xl">
          {LocalDateTimeRenderer(placed_at)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(placed_at, { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter>
        <LuCalendarCheck className="w-8 h-8" />
      </CardFooter>
    </Card>
  );
};

const PriorityCard = (priority: number, className: string) => {
  let content = ["Low", <LuArrowDown className={className} />];
  if (priority < 5) {
    content = ["High", <LuArrowUp className={className} />];
  } else if (priority === 5) {
    content = ["Medium", <LuArrowRight className={className} />];
  }

  return (
    <Card className="grid">
      <CardHeader className="pb-0">
        <CardDescription>Priority</CardDescription>
      </CardHeader>
      <CardContent className="font-medium text-2xl">{content[0]}</CardContent>
      <CardFooter>{content[1]}</CardFooter>
    </Card>
  );
};

const ServiceStatusCards = ({
  data: { service_status, placed_at, priority, estimation_delivery },
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
      {EstimatedCompletionCard(
        service_status,
        String(estimation_delivery),
        String(placed_at)
      )}

      {PlacedAtCard(String(placed_at))}

      {StatusCard(service_status, "w-8 h-8")}

      {PriorityCard(priority, "w-8 h-8")}
    </div>
  );
};

export default ServiceStatusCards;
