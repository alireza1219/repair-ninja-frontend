import { useQuery } from "@tanstack/react-query";
import { SERVICES_CACHE_KEY } from "@/constants/common";
import { Service } from "@/models/Service";
import { retrieveService } from "@/services/Service";

export const useRetrieveService = (id: number, options = {}) => {
  return useQuery<Service>({
    queryKey: [SERVICES_CACHE_KEY, id],

    queryFn: async () => {
      const response = await retrieveService(id);
      return response.data;
    },

    ...options,
  });
};