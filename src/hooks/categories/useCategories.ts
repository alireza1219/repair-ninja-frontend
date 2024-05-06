import { CategoryList } from "@/models/Category";
import { CATEGORIES_CACHE_KEY } from "@/constants/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listCategory } from "@/services/Category";
import { PaginationState } from "@tanstack/react-table";

export const useCategories = (pagination: PaginationState) => {
  return useQuery<CategoryList>({
    // For reference:
    // https://tanstack.com/query/latest/docs/framework/react/guides/queries
    // https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
    queryKey: [CATEGORIES_CACHE_KEY, pagination],

    // https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
    queryFn: async () => {
      const response = await listCategory({
        // Setting the default pageIndex to 1, will cause a conflict with react-table.
        // The react-table thinks we're currently on the second page :D!
        // This is a simple workaround for now.
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      });

      return response.data;
    },

    // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata
    placeholderData: keepPreviousData,
  });
};
