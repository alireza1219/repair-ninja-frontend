import { requestOtp } from "@/services/Auth";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";

import { OtpRequest, OtpRequestType } from "./OtpRequest";
import { OtpVerify } from "./OtpVerify";
import { UseFormSetError } from "react-hook-form";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";

type CurrentStep = "request" | "verify";

const OtpForm = () => {
  const { otpLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<CurrentStep>("request");

  const otpRequestHandler = async (
    email: string,
    setError: UseFormSetError<OtpRequestType>
  ) => {
    try {
      setIsPending(true);
      const response = await requestOtp(email);
      if (response?.data.message) {
        setEmail(email);
        setCurrentStep("verify");
      }
    } catch (error: any) {
      handleFormInputError(error, setError);
    } finally {
      setIsPending(false);
    }
  };

  const otpVerifyHandler = (otp: string) => {
    otpLogin(email, otp);
  };

  return (
    <>
      {currentStep === "request" ? (
        <OtpRequest onSubmit={otpRequestHandler} isPending={isPending} />
      ) : (
        <OtpVerify onSubmit={otpVerifyHandler} />
      )}
    </>
  );
};

export { OtpForm };
