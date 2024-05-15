import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

type Props = {
  to: string;
  text?: string;
  className?: string;
};

const NavigationButton = ({to, text, className}: Props) => {
  return (
    <Link to={to}>
      <Button size="sm" className={cn(className)}>
        <LuArrowLeft className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {text ? text : "Go Back"}
        </span>
      </Button>
    </Link>
  );
};

export default NavigationButton;
