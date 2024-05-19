import { Repairman } from "@/models/Repairman";
import { REPAIRMEN_CACHE_KEY } from "@/constants/common";
import { deleteUser } from "@/services/User";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { UserProfileDelete, userProfileDeleteSchema } from "@/models/User";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { toast } from "react-toastify";

interface Props {
  repairman: Repairman;
  onSuccess: () => void;
}

const DeleteRepairmanForm = ({
  repairman: {
    user_id,
    user_profile: { username },
  },
  onSuccess,
}: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<UserProfileDelete>({
    resolver: zodResolver(userProfileDeleteSchema),
    defaultValues: {
      confirm: "",
    },
  });

  const onSubmit = async (values: UserProfileDelete) => {
    try {
      setIsPending(true);
      const response = await deleteUser(user_id, values);
      if (response?.status === 204) {
        toast.success("Successfully deleted the repairman.");
        queryClient.invalidateQueries({
          queryKey: [REPAIRMEN_CACHE_KEY],
        });
        onSuccess();
      } else {
        toast.warning(
          "Something went wrong when deleting this repairman. Please try again later."
        );
      }
    } catch (error) {
      handleFormInputError(error, form.setError);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <p>
            Please confirm your delete action by manually typing the{" "}
            <code className="font-medium text-red-500">{username}</code> inside
            the confirm box.
          </p>
          <Input
            name="confirm"
            label="Confirm"
            control={form.control}
            placeholder="Confirm your deletion"
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="destructive"
          className="w-full mt-5"
        >
          {isPending && <Spinner className="mr-2" size={16} />}
          Delete Repairman
        </Button>
      </form>
    </Form>
  );
};

export default DeleteRepairmanForm;
