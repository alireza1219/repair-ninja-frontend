import { Category } from "@/models/Category";
import { CATEGORIES_CACHE_KEY } from "@/constants/common";
import { updateCategory } from "@/services/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type callbackFn = () => void;

export const useCategoryUpdate = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: async (category: Category) => {
      const response = await updateCategory(category.id!, category.title);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORIES_CACHE_KEY],
      });

      toast.success("Successfully updated the category.");

      handleOnSuccess();
    },
  });
};
