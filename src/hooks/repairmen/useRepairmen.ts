import { RepairmanList } from "@/models/Repairman";
import { REPAIRMEN_CACHE_KEY } from "@/constants/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listRepairman } from "@/services/Repairman";
import { PaginationState } from "@tanstack/react-table";

export const useRepairmen = (pagination: PaginationState) => {
  return useQuery<RepairmanList>({
    queryKey: [REPAIRMEN_CACHE_KEY, pagination],

    queryFn: async () => {
      const response = await listRepairman({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });

      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
