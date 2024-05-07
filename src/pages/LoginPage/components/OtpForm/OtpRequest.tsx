import { UseFormSetError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
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

const otpRequestSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Your email address is required." }),
});

export type OtpRequestType = z.infer<typeof otpRequestSchema>;

interface OtpRequestProps {
  isPending?: boolean;
  onSubmit: (email: string, setError: UseFormSetError<OtpRequestType>) => void;
}

const OtpRequest = ({ onSubmit, isPending = false }: OtpRequestProps) => {
  const form = useForm<OtpRequestType>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = (values: OtpRequestType) => {
    onSubmit(values.email, form.setError);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-5" disabled={isPending}>
          {isPending && <Spinner className="mr-2" size={16} />}
          Request One-Time Password
        </Button>
      </form>
    </Form>
  );
};

export { OtpRequest };
