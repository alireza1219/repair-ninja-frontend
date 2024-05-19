import { CustomerList } from "@/models/Customer";
import { CUSTOMERS_CACHE_KEY } from "@/constants/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listCustomer } from "@/services/Customer";
import { PaginationState } from "@tanstack/react-table";

export const useCustomers = (pagination: PaginationState) => {
  return useQuery<CustomerList>({
    queryKey: [CUSTOMERS_CACHE_KEY, pagination],

    queryFn: async () => {
      const response = await listCustomer({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });

      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
