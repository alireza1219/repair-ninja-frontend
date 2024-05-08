import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { SERVICES_CACHE_KEY } from "@/constants/common";
import { BasicServiceList, ServiceList } from "@/models/Service";
import { getBasicServiceList, getServiceList } from "@/services/Service";

export const useBasicServices = (pagination: PaginationState) => {
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
  });
};

export const useServices = (pagination: PaginationState) => {
  return useQuery<ServiceList>({
    queryKey: [SERVICES_CACHE_KEY, pagination],

    queryFn: async () => {
      const response = await getServiceList({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });
      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
