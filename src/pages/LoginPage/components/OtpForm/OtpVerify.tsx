import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpVerifySchema = z.object({
  otp: z.string().min(6, {
    message: "Your One-Time Password can not be empty!",
  }),
});

type OtpVerifyType = z.infer<typeof otpVerifySchema>;

interface OtpVerifyProps {
  isPending?: boolean;
  onSubmit: (otp: string) => void;
}

const OtpVerify = ({ onSubmit, isPending = false }: OtpVerifyProps) => {
  const form = useForm<OtpVerifyType>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const submitHandler = (values: OtpVerifyType) => {
    onSubmit(values.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  containerClassName="p-6 flex w-full justify-center items-center"
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password that was just sent to your
                email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-5" disabled={isPending}>
          {isPending && <Spinner className="mr-2" size={16} />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export { OtpVerify };
