import axios from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: any) => {
  // FIXME: https://github.com/alireza1219/repair-ninja/issues/6
  // I'm showing the errors based on the default response structure of DRF. Which is not standard at all.
  if (axios.isAxiosError(error)) {
    var err = error.response;

    if (typeof err?.data === "object") {
      for (let e in err?.data) {
        toast.error(
          `
          ${e.toUpperCase()}:
          ${typeof err.data[e] === "string" ? err.data[e] : err.data[e][0]}
          `
        );
      }
    } else if (err?.data) {
      toast.error(err.data);
    } else if (err) {
      toast.error(`${err?.status} ${err?.statusText}`);
    } else {
      toast.error("Unexpected error. Check your console for more information.");
    }
  }
};
