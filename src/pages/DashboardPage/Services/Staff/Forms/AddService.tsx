import { loadCustomersAsOptions } from "@/services/Customer";
import { loadRepairmenAsOptions } from "@/services/Repairman";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/FormFields/DatePicker";
import { Form } from "@/components/ui/form";
import { ServiceFormData, serviceFormSchema } from "@/models/Service";
import { Select, SelectAsync } from "@/components/FormFields/Select";
import { TextArea } from "@/components/FormFields/TextArea";
import { createService } from "@/services/Service";
import { toast } from "react-toastify";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/RoutePath";

export const AddServiceForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const priorities = [
    { value: 1, label: "High" },
    { value: 5, label: "Medium" },
    { value: 10, label: "Low" },
  ];

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      description: "",
      assigned_to: [],
    },
  });

  const onSubmit = async (data: ServiceFormData) => {
    const requestBody = {
      customer: data.customer.value,
      assigned_to: data.assigned_to?.map((item) => item.value) || [],
      priority: data.priority.value,
      estimation_delivery: data.estimation_delivery.toISOString().split("T")[0],
      description: data.description || "",
    };

    try {
      const response = await createService(requestBody);
      if (response.status === 201 && response.data.id) {
        toast.success("Successfully created a new service.");
        const NewServicePath = `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.DASH_SERVICES}/${response.data.id}`;
        navigate(NewServicePath);
      } else {
        toast.error(
          "Something went wrong with service creation. Please try again later."
        );
      }
    } catch (error) {
      handleFormInputError(error, form.setError);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <SelectAsync
            name="customer"
            label="Customer"
            placeholder="Search for a customer"
            control={form.control}
            loadOptions={loadCustomersAsOptions}
          />

          <SelectAsync
            name="assigned_to"
            label="Assignees"
            placeholder="Search for a repairman"
            control={form.control}
            isMultiSelect={true}
            loadOptions={loadRepairmenAsOptions}
          />

          <Select
            name="priority"
            label="Priority"
            control={form.control}
            options={priorities}
          />

          <DatePicker
            name="estimation_delivery"
            label="Estimated Completion Date"
            control={form.control}
            open={open}
            setOpen={setOpen}
          />

          <TextArea
            control={form.control}
            name="description"
            label="Description"
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full mt-5">
          Create a New Service
        </Button>
      </form>
    </Form>
  );
};
