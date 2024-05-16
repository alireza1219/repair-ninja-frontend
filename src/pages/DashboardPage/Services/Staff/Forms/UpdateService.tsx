import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { loadRepairmenAsOptions } from "@/services/Repairman";
import { SERVICES_CACHE_KEY } from "@/constants/common";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/FormFields/DatePicker";
import { Form } from "@/components/ui/form";
import {
  Service,
  ServiceUpdateData,
  serviceUpdateSchema,
} from "@/models/Service";
import { Select, SelectAsync } from "@/components/FormFields/Select";
import { TextArea } from "@/components/FormFields/TextArea";
import { updateService } from "@/services/Service";
import { toast } from "react-toastify";

interface Props {
  defaultValues: Service;
  serviceId: number;
}

export const UpdateServiceForm = ({ serviceId, defaultValues }: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  const priorities = [
    { value: 1, label: "High" },
    { value: 5, label: "Medium" },
    { value: 10, label: "Low" },
  ];

  const statuses = [
    { value: "R", label: "Received" },
    { value: "I", label: "In Progress" },
    { value: "C", label: "Completed" },
    { value: "D", label: "Delivered" },
  ];

  // It's not possible to directly
  const defaultFormData = {
    service_status: statuses.filter(
      (object) => object.value === defaultValues.service_status
    )[0],
    priority: priorities.filter(
      (object) => object.value === defaultValues.priority
    )[0],
    description: defaultValues.description,
    estimation_delivery: new Date(defaultValues.estimation_delivery),
    assigned_to: defaultValues.assigned_to.map(
      ({ id, user_profile: { first_name, last_name, username } }) => {
        return {
          value: id,
          label:
            first_name && last_name ? `${first_name} ${last_name}` : username,
        };
      }
    ),
  };

  const form = useForm<ServiceUpdateData>({
    resolver: zodResolver(serviceUpdateSchema),
    defaultValues: defaultFormData,
  });

  const onSubmit = async (data: ServiceUpdateData) => {
    debugger;
    const requestBody = {
      service_status: data.service_status.value,
      priority: data.priority.value,
      description: data.description || "",
      estimation_delivery: data.estimation_delivery.toISOString().split("T")[0],
      assigned_to: data.assigned_to?.map((item) => item.value) || [],
    };

    try {
      setIsPending(true);
      const response = await updateService(serviceId, requestBody);
      if (response.status === 200) {
        toast.success("Successfully updated the service.");
        queryClient.invalidateQueries({
          queryKey: [SERVICES_CACHE_KEY, serviceId],
        });
      } else {
        toast.error(
          "Something went wrong when updating the service. Please try again later."
        );
      }
    } catch (error) {
      handleFormInputError(error, form.setError);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
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

          <Select
            name="service_status"
            label="Service Status"
            control={form.control}
            options={statuses}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="w-full mt-5"
        >
          {isPending && <Spinner className="mr-2" size={16} />}
          Update Service
        </Button>
      </form>
    </Form>
  );
};
