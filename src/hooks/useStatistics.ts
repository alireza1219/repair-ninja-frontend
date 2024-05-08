import { STATISTICS_CACHE_KEY } from "@/constants/common";
import { ServiceStatistics } from "@/models/Statistics";
import { getServiceStatistics } from "@/services/Statistic";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useDashboardStatistics = () => {
  return useQuery<ServiceStatistics>({
    queryKey: [STATISTICS_CACHE_KEY],

    queryFn: async () => {
      const response = await getServiceStatistics();
      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
