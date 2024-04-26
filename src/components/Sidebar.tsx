import React from "react";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

export interface SidebarItem {
  to: string;
  text: string;
  icon: IconType;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const location = useLocation();
  return (
    <nav className="grid items-start px-2 lg:px-4 py-6 md:py-0 gap-2 md:gap-0 text-lg md:text-sm font-medium">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            to={item.to}
            className={cn(
              "mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-3 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              // This indicates an active sidebar link:
              { "bg-muted text-primary": item.to === location.pathname }
            )}
          >
            <item.icon className="h-5 w-5 md:h-4 md:h-4" />
            {item.text}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export { Sidebar };
