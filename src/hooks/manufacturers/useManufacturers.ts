import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listManufacturer } from "@/services/Manufacturer";
import { PaginationState } from "@tanstack/react-table";
import { MANUFACTURER_CACHE_KEY } from "@/constants/common";
import { ManufacturerList } from "@/models/Manufacturer";

export const useManufacturers = (pagination: PaginationState) => {
  return useQuery<ManufacturerList>({
    queryKey: [MANUFACTURER_CACHE_KEY, pagination],

    queryFn: async () => {
      const response = await listManufacturer({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });
      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
