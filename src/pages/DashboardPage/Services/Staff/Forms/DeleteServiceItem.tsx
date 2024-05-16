import { deleteServiceItem } from "@/services/ServiceItem";
import { ITEMS_CACHE_KEY, SERVICES_CACHE_KEY } from "@/constants/common";
import { ServiceItem } from "@/models/ServiceItem";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Props {
  item: ServiceItem;
  onSuccess: () => void;
  serviceId: number;
}

const DeleteServiceItemForm = ({ item, onSuccess, serviceId }: Props) => {
  // TODO: Migration to react query.
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const onDelete = async () => {
    try {
      setIsPending(true);
      const response = await deleteServiceItem(serviceId, item.id);
      if (response.status === 204) {
        toast.success("Successfully deleted associated item to this service.");
        queryClient.invalidateQueries({
          queryKey: [SERVICES_CACHE_KEY, ITEMS_CACHE_KEY, serviceId],
        });
        onSuccess();
      } else {
        toast.error(
          "Something went wrong when deleting this item. Please try again later."
        );
      }
    } catch (error) {
      // Do nothing,
      // A toast with the error message was displayed before.
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div>
      <p>
        Are you sure you want to delete {item.name} from the service #
        {serviceId}?
      </p>
      <Button
        className="mt-6 w-full"
        variant="destructive"
        disabled={isPending}
        onClick={() => onDelete()}
      >
        {isPending && <Spinner className="mr-2" size={16} />}
        Delete Manufacturer
      </Button>
    </div>
  );
};

export default DeleteServiceItemForm;
