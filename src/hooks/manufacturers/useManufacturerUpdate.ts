import { Manufacturer } from "@/models/Manufacturer";
import { MANUFACTURER_CACHE_KEY } from "@/constants/common";
import { toast } from "react-toastify";
import { updateManufacturer } from "@/services/Manufacturer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type callbackFn = () => void;

export const useManufacturerUpdate = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<Manufacturer, Error, Manufacturer>({
    mutationFn: async (manufacturer: Manufacturer) => {
      const response = await updateManufacturer(manufacturer.id!, manufacturer.name);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MANUFACTURER_CACHE_KEY],
      });

      toast.success("Successfully updated the manufacturer.");

      handleOnSuccess();
    },
  });
};
