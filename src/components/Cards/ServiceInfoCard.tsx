import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/models/Service";
import { Label } from "@/components/ui/label";

interface Props extends React.ComponentProps<typeof Card> {
  data: Service;
}

const ServiceInfoCard = ({
  data: { id, description, assigned_to },
  className,
  ...props
}: Props) => {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>Service ID: {id}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <div className="grid gap-2">
            <Label>Description</Label>
            <div className="text-sm text-justify text-muted-foreground">
              {description
                ? description
                : "There's no description available for the selected service."}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="grid gap-2">
            <Label>Assignees</Label>
            {assigned_to.length > 0 ? (
              assigned_to.map(
                ({ id, user_profile: { first_name, last_name, username } }) => (
                  <div
                    key={id}
                    className="text-sm text-justify text-muted-foreground"
                  >
                    {first_name && last_name
                      ? `${first_name} ${last_name}`
                      : username}
                  </div>
                )
              )
            ) : (
              <div className="text-sm text-muted-foreground">No assignees!</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium"></label>
            <div className="text-sm text-muted-foreground"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium"></label>
            <div className="text-sm text-muted-foreground"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceInfoCard;
