import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerProfile } from "@/models/Customer";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

interface Props extends React.ComponentProps<typeof Card> {
  data: CustomerProfile;
}

const CustomerInfoCard = ({
  data: {
    id,
    user_profile: { first_name, last_name, username, email },
    phone,
  },
  className,
  ...props
}: Props) => {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>Customer ID: {id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <LuUser className="flex h-8 w-8" />
          <div className="grid gap-1">
            <label className="text-sm font-medium">
              {first_name && last_name ? "Name" : "Username"}
            </label>
            <div className="text-sm text-muted-foreground">
              {first_name && last_name
                ? `${first_name} ${last_name}`
                : username}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LuMail className="flex h-8 w-8" />
          <div className="grid gap-1">
            <label className="text-sm font-medium">Email Address</label>
            <a
              href={`mailto:${email}`}
              className="text-sm text-muted-foreground"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LuPhone className="flex h-8 w-8" />
          <div className="grid gap-1">
            <label className="text-sm font-medium">Phone Number</label>
            <a
              href={`tel:${phone}`}
              className="mt-1 text-sm text-muted-foreground"
            >
              {phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoCard;
