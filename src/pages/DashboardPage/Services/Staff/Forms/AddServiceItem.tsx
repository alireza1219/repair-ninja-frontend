import { createServiceItem } from "@/services/ServiceItem";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { loadCategoriesAsOptions } from "@/services/Category";
import { loadManufacturersAsOptions } from "@/services/Manufacturer";
import {
  ServiceItemFormData,
  serviceItemFormSchema,
} from "@/models/ServiceItem";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { SelectAsync } from "@/components/FormFields/Select";
import { TextArea } from "@/components/FormFields/TextArea";
import { toast } from "react-toastify";

interface AddServiceItemProps {
  serviceId: number;
}

export const AddServiceItem = ({ serviceId }: AddServiceItemProps) => {
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (values: ServiceItemFormData) => {
    // Make TypeScript compiler happy.
    if (!values.manufacturer || !values.category) {
      return;
    }

    const requestBody = {
      ...values,
      manufacturer: values.manufacturer.value,
      category: values.category.value,
    };

    try {
      setIsPending(true);
      const response = await createServiceItem(serviceId, requestBody);
      if (response.status === 201) {
        toast.success(
          `Successfully added a new item on service with ID ${serviceId}.`
        );
        form.reset();
      } else {
        toast.error(
          "Something went wrong with service item creation. Please try again later."
        );
      }
    } catch (error) {
      handleFormInputError(error, form.setError);
    } finally {
      setIsPending(false);
    }
  };

  const form = useForm<ServiceItemFormData>({
    resolver: zodResolver(serviceItemFormSchema),
    defaultValues: {
      name: "",
      serial_number: "",
      condition: "",
      // Setting select's default value to null is required.
      // Otherwise resetting the form will not affect them.
      manufacturer: null,
      category: null,
      notes: "",
      quantity: 1,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <Input
            name="name"
            label="Name"
            control={form.control}
            placeholder="Product name"
          />

          <Input
            name="serial_number"
            label="Serial Number"
            control={form.control}
            placeholder="Product serial number"
          />

          <Input
            name="condition"
            label="Condition"
            control={form.control}
            placeholder="Describe the current condition of this product"
          />

          <SelectAsync
            name="manufacturer"
            label="Manufacturer"
            placeholder="Search for a manufacturer..."
            control={form.control}
            loadOptions={loadManufacturersAsOptions}
          />

          <SelectAsync
            name="category"
            label="Category"
            placeholder="Search for a category..."
            control={form.control}
            loadOptions={loadCategoriesAsOptions}
          />

          <TextArea
            name="notes"
            label="Notes"
            control={form.control}
            isResizable={false}
            placeholder="Additional notes..."
          />

          <Input
            name="quantity"
            label="Quantity"
            type={"number"}
            control={form.control}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="w-full mt-5"
        >
          {isPending && <Spinner className="mr-2" size={16} />}
          Add Service Item
        </Button>
      </form>
    </Form>
  );
};
