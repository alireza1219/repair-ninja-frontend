import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { ITEMS_CACHE_KEY, SERVICES_CACHE_KEY } from "@/constants/common";
import { ServiceItemPatchBody, serviceItemSchema } from "@/models/ServiceItem";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { TextArea } from "@/components/FormFields/TextArea";
import { toast } from "react-toastify";
import { updateServiceItem } from "@/services/ServiceItem";

interface Props {
  defaultValues: ServiceItemPatchBody;
  itemId: number;
  onSuccess: () => void;
  serviceId: number;
}

export const UpdateServiceItemForm = ({
  defaultValues,
  itemId,
  onSuccess,
  serviceId,
}: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (values: ServiceItemPatchBody) => {
    try {
      setIsPending(true);
      const response = await updateServiceItem(serviceId, itemId, values);
      if (response.status === 200) {
        toast.success("Successfully updated the service item.");
        queryClient.invalidateQueries({
          queryKey: [SERVICES_CACHE_KEY, ITEMS_CACHE_KEY, serviceId],
        });
        onSuccess();
      } else {
        toast.success(
          "Something went wrong when updating this item. Please try again later."
        );
      }
    } catch (error) {
      handleFormInputError(error, form.setError);
    } finally {
      setIsPending(false);
    }
  };

  const form = useForm<ServiceItemPatchBody>({
    resolver: zodResolver(
      serviceItemSchema.pick({ notes: true, quantity: true })
    ),
    defaultValues: defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
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
          className="w-full mt-5"
          disabled={isPending}
          type="submit"
          variant="secondary"
        >
          {isPending && <Spinner className="mr-2" size={16} />}
          Update Service Item
        </Button>
      </form>
    </Form>
  );
};
