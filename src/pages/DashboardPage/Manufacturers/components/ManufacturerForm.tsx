import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { Manufacturer, manufacturerSchema } from "@/models/Manufacturer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";

interface ManufacturerFormProps {
  initialData?: Manufacturer;
  isPending?: boolean;
  onSubmit: (data: Manufacturer) => Promise<Manufacturer>;
}

export const ManufacturerForm = ({
  initialData,
  isPending = false,
  onSubmit,
}: ManufacturerFormProps) => {
  const form = useForm<Manufacturer>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: initialData ?? { name: "" },
  });

  const submitHandler = async (data: Manufacturer) => {
    try {
      await onSubmit(data);
    } catch (error) {
      handleFormInputError(error, form.setError);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid items-start gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Spinner className="mr-2" size={16} />}
          {initialData ? "Update Manufacturer" : "Create Manufacturer"}
        </Button>
      </form>
    </Form>
  );
};
