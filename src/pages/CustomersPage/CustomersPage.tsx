import CustomersDataTable from "./DataTable/DataTable";
import { Customer } from "@/models/Customer";
import { useState } from "react";

import AddCustomerForm from "./Forms/AddCustomer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerDialog } from "@/components/DrawerDialog";
import DeleteCustomerForm from "./Forms/DeleteCustomer";
import UpdateCustomerPhoneForm from "./Forms/UpdatePhone";
import UpdateCustomerProfile from "./Forms/UpdateProfile";

type tabs = "overview" | "createCustomer";

const CustomersPage = () => {
  const [customer, setCustomer] = useState<Customer>();
  const [tab, setTab] = useState<tabs>("overview");
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);

  const TableActionHandler = (customer: Customer, mode: string) => {
    setCustomer(customer);
    setMode(mode);
    setOpen(true);
  };
  const onSuccess = () => setOpen(false);
  const getDialogContent = (mode: string) => {
    switch (mode) {
      case "update_profile":
        return (
          <UpdateCustomerProfile customer={customer!} onSuccess={onSuccess} />
        );
      case "update_phone":
        return (
          <UpdateCustomerPhoneForm customer={customer!} onSuccess={onSuccess} />
        );
      case "delete":
        return (
          <DeleteCustomerForm customer={customer!} onSuccess={onSuccess} />
        );

      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="grid gap-1">
        <h1 className="text-lg font-semibold md:text-2xl">Customers</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage Repair Ninja's Customers.
        </p>
      </div>
      <Tabs
        value={tab}
        onValueChange={(value: string) => setTab(value as typeof tab)}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="createCustomer">Create Customer</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="pt-3">
            <CustomersDataTable actionHandler={TableActionHandler} />
          </div>
        </TabsContent>
        <TabsContent value="createCustomer">
          <div className="pt-3">
            <AddCustomerForm />
          </div>
        </TabsContent>
      </Tabs>
      <DrawerDialog
        title="Customer Action"
        open={open}
        onOpenChange={(open) => setOpen(open)}
      >
        {getDialogContent(mode)}
      </DrawerDialog>
    </>
  );
};

export default CustomersPage;
