import { Repairman } from "@/models/Repairman";
import { REPAIRMEN_CACHE_KEY } from "@/constants/common";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/FormFields/Input";
import { toast } from "react-toastify";
import { UserProfilePatch, userProfilePatchSchema } from "@/models/User";
import { updateUser } from "@/services/User";

interface Props {
  repairman: Repairman;
  onSuccess: () => void;
}

const UpdateRepairmanProfile = ({
  repairman: {
    user_id,
    user_profile: { first_name, last_name, email },
  },
  onSuccess,
}: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<UserProfilePatch>({
    resolver: zodResolver(userProfilePatchSchema),
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  });

  const onSubmit = async (values: UserProfilePatch) => {
    try {
      setIsPending(true);
      const response = await updateUser(user_id, values);
      if (response?.status === 200) {
        toast.success("Successfully updated the profile.");
        queryClient.invalidateQueries({
          queryKey: [REPAIRMEN_CACHE_KEY],
        });
        onSuccess();
      } else {
        toast.warning(
          "Something went wrong when updating the profile. Please try again later."
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
          <Input
            name="first_name"
            label="First Name"
            control={form.control}
            placeholder="Repairman's first name"
          />

          <Input
            name="last_name"
            label="Last Name"
            control={form.control}
            placeholder="Repairman's last name"
          />

          <Input
            name="email"
            label="Email Address"
            control={form.control}
            placeholder="Repairman's email address"
          />
        </div>
        <Button disabled={isPending} type="submit" className="w-full mt-5">
          {isPending && <Spinner className="mr-2" size={16} />}
          Update the Profile
        </Button>
      </form>
    </Form>
  );
};

export default UpdateRepairmanProfile;
