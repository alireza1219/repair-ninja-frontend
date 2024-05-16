import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listServiceItems } from "@/services/ServiceItem";
import { PaginationState } from "@tanstack/react-table";
import { SERVICES_CACHE_KEY, ITEMS_CACHE_KEY } from "@/constants/common";
import { ServiceItemList } from "@/models/ServiceItem";

export const useServiceItems = (
  serviceId: number,
  pagination: PaginationState
) => {
  return useQuery<ServiceItemList>({
    queryKey: [SERVICES_CACHE_KEY, ITEMS_CACHE_KEY, serviceId, pagination],

    queryFn: async () => {
      const response = await listServiceItems(serviceId, {
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });
      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
