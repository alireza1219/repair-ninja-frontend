import { checkPhoneAvailability, createCustomer } from "@/services/Customer";
import { createUser } from "@/services/User";
import { customerSchema } from "@/models/Customer";
import { CUSTOMERS_CACHE_KEY } from "@/constants/common";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { userProfilePostSchema } from "@/models/User";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { toast } from "react-toastify";

const formSchema = userProfilePostSchema
  .merge(customerSchema.pick({ phone: true }))
  .extend({
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match.",
    path: ["passwordRepeat"],
  });

type formData = z.infer<typeof formSchema>;

const AddCustomerForm = () => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (values: formData) => {
    try {
      setIsPending(true);
      await checkPhoneAvailability(values.phone);
      const userCreateResponse = await createUser(values);
      if (userCreateResponse?.status === 201 && userCreateResponse.data.id) {
        const data = {
          user_id: userCreateResponse.data.id,
          phone: values.phone,
        };
        const customerCreateResponse = await createCustomer(data);
        if (
          customerCreateResponse?.status === 201 &&
          customerCreateResponse.data.id
        ) {
          toast.success("Successfully created a new customer.");
          form.reset();
          queryClient.invalidateQueries({
            queryKey: [CUSTOMERS_CACHE_KEY],
          });
        } else {
          toast.warning(
            "Something went wrong while creating a customer profile. Please contact the administrator."
          );
        }
      } else {
        toast.error(
          "Something went wrong while creating a new user. Please try again later."
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
            name="first_name"
            label="First Name"
            control={form.control}
            placeholder="Customer's first name"
          />

          <Input
            name="last_name"
            label="Last Name"
            control={form.control}
            placeholder="Customer's last name"
          />

          <Input
            name="email"
            label="Email Address"
            control={form.control}
            placeholder="Customer's email address"
          />

          <Input
            name="phone"
            label="Phone Number"
            control={form.control}
            placeholder="Customer's phone number"
          />

          <Input
            name="username"
            label="Username"
            control={form.control}
            placeholder="Choose a username"
          />

          <Input
            name="password"
            label="Password"
            control={form.control}
            placeholder="Choose a password"
            type="password"
          />

          <Input
            name="passwordRepeat"
            label="Password Repeat"
            control={form.control}
            placeholder="Repeat the chosen password"
            type="password"
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="w-full mt-5"
        >
          {isPending && <Spinner className="mr-2" size={16} />}
          Create a New Customer
        </Button>
      </form>
    </Form>
  );
};

export default AddCustomerForm;
