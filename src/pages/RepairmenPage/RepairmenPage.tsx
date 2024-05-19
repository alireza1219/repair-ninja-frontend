import RepairmenDataTable from "./DataTable/DataTable";
import { Repairman } from "@/models/Repairman";
import { useState } from "react";

import AddRepairmanForm from "./Forms/AddRepairman";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerDialog } from "@/components/DrawerDialog";
import DeleteRepairmanForm from "./Forms/DeleteRepairman";
import UpdateRepairmanPhoneForm from "./Forms/UpdatePhone";
import UpdateRepairmanProfile from "./Forms/UpdateProfile";

type tabs = "overview" | "createRepairman";

const RepairmanPage = () => {
  const [repairman, setRepairman] = useState<Repairman>();
  const [tab, setTab] = useState<tabs>("overview");
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);

  const TableActionHandler = (repairman: Repairman, mode: string) => {
    setRepairman(repairman);
    setMode(mode);
    setOpen(true);
  };
  const onSuccess = () => setOpen(false);
  const getDialogContent = (mode: string) => {
    switch (mode) {
      case "update_profile":
        return (
          <UpdateRepairmanProfile repairman={repairman!} onSuccess={onSuccess} />
        );
      case "update_phone":
        return (
          <UpdateRepairmanPhoneForm repairman={repairman!} onSuccess={onSuccess} />
        );
      case "delete":
        return (
          <DeleteRepairmanForm repairman={repairman!} onSuccess={onSuccess} />
        );

      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="grid gap-1">
        <h1 className="text-lg font-semibold md:text-2xl">Repairmen</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage Repair Ninja's Repairmen.
        </p>
      </div>
      <Tabs
        value={tab}
        onValueChange={(value: string) => setTab(value as typeof tab)}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="createRepairman">Create Repairman</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="pt-3">
            <RepairmenDataTable actionHandler={TableActionHandler} />
          </div>
        </TabsContent>
        <TabsContent value="createRepairman">
          <div className="pt-3">
            <AddRepairmanForm />
          </div>
        </TabsContent>
      </Tabs>
      <DrawerDialog
        title="Repairman Action"
        open={open}
        onOpenChange={(open) => setOpen(open)}
      >
        {getDialogContent(mode)}
      </DrawerDialog>
    </>
  );
};

export default RepairmanPage;
