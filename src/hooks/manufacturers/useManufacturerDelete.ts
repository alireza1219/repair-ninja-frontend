import { deleteManufacturer } from "@/services/Manufacturer";
import { Manufacturer } from "@/models/Manufacturer";
import { MANUFACTURER_CACHE_KEY } from "@/constants/common";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type callbackFn = () => void;

export const useManufacturerDelete = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Manufacturer>({
    mutationFn: async (manufacturer: Manufacturer) => {
      await deleteManufacturer(manufacturer.id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MANUFACTURER_CACHE_KEY],
      });

      toast.success("Successfully deleted the manufacturer.");

      handleOnSuccess();
    },
  });
};
