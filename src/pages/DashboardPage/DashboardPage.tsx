// Hooks, Functions.
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";
import { useAuth } from "@/context/useAuth";

// UI Elements, Components.
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LuFactory,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuTag,
  LuUser,
  LuUserCircle,
  LuUserCog,
  LuWrench,
} from "react-icons/lu";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SidebarItems: SidebarItem[] = [
  {
    to: `/${ROUTE_PATH.DASHBOARD}`,
    icon: LuLayoutDashboard,
    text: "Dashboard",
  },
  { to: "#", icon: LuUser, text: "Customers" },
  { to: "#", icon: LuUserCog, text: "Repairmen" },
  { to: "#", icon: LuTag, text: "Categories" },
  { to: "#", icon: LuFactory, text: "Manufacturers" },
  { to: "#", icon: LuWrench, text: "Services" },
];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to={`/${ROUTE_PATH.HOME}`}
              className="flex items-center gap-2 font-black"
            >
              <BsWrenchAdjustableCircle className="h-7 w-7" />
              <span>Repair Ninja</span>
            </Link>
          </div>
          <div className="flex-1">
            <Sidebar items={SidebarItems} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <LuMenu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Sidebar items={SidebarItems} />
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <LuUserCircle className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-700"
                onClick={() => logout()}
              >
                <LuLogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Hello, {user?.first_name ? user.first_name : user?.username}!
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
