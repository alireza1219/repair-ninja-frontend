import { Category } from "@/models/Category";
import { deleteCategory } from "@/services/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type callbackFn = () => void;

export const useCategoryDelete = (handleOnSuccess: callbackFn) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Category>({
    mutationFn: async (category: Category) => {
      await deleteCategory(category.id!);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Successfully deleted the category.");

      handleOnSuccess();
    },
  });
};
