import { Category } from "@/models/Category";
import { createCategory } from "@/services/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type callbackFn = () => void;

export const useCategoryCreate = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: async (category: Category) => {
      const response = await createCategory(category.title);
      return response.data;
    },

    onSuccess: (savedCategory) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success(
        `Successfully created the ${savedCategory.title} category.`
      );

      handleOnSuccess();
    },
  });
};
