import { deleteService } from "@/services/Service";
import { SERVICES_CACHE_KEY } from "@/constants/common";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type callbackFn = () => void;

export const useServiceDelete = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await deleteService(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICES_CACHE_KEY],
      });

      toast.success("Successfully deleted the service.");

      handleOnSuccess();
    },
  });
};
