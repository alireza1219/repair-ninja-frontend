import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";
import { SkeletonCard } from "@/components/SkeletonCard";

export interface CardInfo {
  title: string;
  subtitle: string | number;
  icon: IconType;
  isLoading?: boolean;
}

const DashboardCard = ({
  title,
  subtitle,
  icon,
  isLoading = false,
}: CardInfo) => {
  if (isLoading) {
    return <SkeletonCard />;
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.createElement(icon, {
          className: "h-4 w-4 text-muted-foreground",
        })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{subtitle}</div>
      </CardContent>
    </Card>
  );
};

export { DashboardCard };
