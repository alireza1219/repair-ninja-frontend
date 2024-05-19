import {
  Customer,
  CustomerPatchBody,
  customerPatchSchema,
} from "@/models/Customer";
import { CUSTOMERS_CACHE_KEY } from "@/constants/common";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { toast } from "react-toastify";
import { updateCustomer } from "@/services/Customer";

interface Props {
  customer: Customer;
  onSuccess: () => void;
}

const UpdateCustomerPhoneForm = ({
  customer: { id, phone },
  onSuccess,
}: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CustomerPatchBody>({
    resolver: zodResolver(customerPatchSchema),
    defaultValues: {
      phone: phone,
    },
  });

  const onSubmit = async (values: CustomerPatchBody) => {
    try {
      setIsPending(true);
      const response = await updateCustomer(id, values);
      if (response?.status === 200) {
        toast.success("Successfully updated the phone number.");
        queryClient.invalidateQueries({
          queryKey: [CUSTOMERS_CACHE_KEY],
        });
        onSuccess();
      } else {
        toast.warning(
          "Something went wrong when updating the phone number. Please try again later."
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
          <Input
            name="phone"
            label="Phone Number"
            control={form.control}
            placeholder="Customer's phone number"
          />
        </div>
        <Button disabled={isPending} type="submit" className="w-full mt-5">
          {isPending && <Spinner className="mr-2" size={16} />}
          Update the Phone Number
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCustomerPhoneForm;
