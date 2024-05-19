import { AxiosError } from "axios";

export const handleFormInputError = (error: unknown, setError: any) => {
  if (error instanceof AxiosError && error.response?.status === 400) {
    const errors = error.response.data;
    if (typeof errors === "object") {
      Object.keys(errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message:
            typeof errors[key] === "string" ? errors[key] : errors[key][0],
        });
      });
    }
  }
};
