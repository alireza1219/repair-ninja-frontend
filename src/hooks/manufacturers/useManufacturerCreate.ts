import { createManufacturer } from "@/services/Manufacturer";
import { MANUFACTURER_CACHE_KEY } from "@/constants/common";
import { Manufacturer } from "@/models/Manufacturer";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type callbackFn = () => void;

export const useManufacturerCreate = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<Manufacturer, Error, Manufacturer>({
    mutationFn: async (manufacturer: Manufacturer) => {
      const response = await createManufacturer(manufacturer.name);
      return response.data;
    },

    onSuccess: (savedManufacturer) => {
      queryClient.invalidateQueries({
        queryKey: [MANUFACTURER_CACHE_KEY],
      });

      toast.success(
        `Successfully created the ${savedManufacturer.name} manufacturer.`
      );

      handleOnSuccess();
    },
  });
};
