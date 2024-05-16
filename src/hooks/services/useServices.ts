import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { SERVICES_CACHE_KEY } from "@/constants/common";
import { BasicServiceList, ServiceList } from "@/models/Service";
import { getBasicServiceList, getServiceList } from "@/services/Service";

export const useBasicServices = (pagination: PaginationState, options = {}) => {
  return useQuery<BasicServiceList>({
    queryKey: [SERVICES_CACHE_KEY, pagination],

    queryFn: async () => {
      const response = await getBasicServiceList({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });
      return response.data;
    },

    placeholderData: keepPreviousData,

    ...options,
  });
};

export const useServices = (
  pagination: PaginationState,
  ordering: SortingState = [],
  options = {}
) => {
  return useQuery<ServiceList>({
    queryKey: [SERVICES_CACHE_KEY, pagination, ordering],

    queryFn: async () => {
      const response = await getServiceList({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        // Turning the ordering array into a string that DRF filtering module understands.
        ordering: ordering
          .map(({ id, desc }) => `${desc ? "-" : ""}${id}`)
          .join(","),
      });
      return response.data;
    },

    placeholderData: keepPreviousData,

    ...options,
  });
};
