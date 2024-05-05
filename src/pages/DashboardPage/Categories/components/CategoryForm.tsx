import { Category, categorySchema } from "@/models/Category";
import { handleFormInputError } from "@/helpers/FormInputErrorHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";

interface CategoryFormProps {
  initialData?: Category;
  isPending?: boolean;
  onSubmit: (data: Category) => Promise<Category>;
}

export const CategoryForm = ({
  initialData,
  isPending = false,
  onSubmit,
}: CategoryFormProps) => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? { title: "" },
  });

  const submitHandler = async (data: Category) => {
    try {
      await onSubmit(data);
    } catch (error) {
      handleFormInputError(error, form.setError);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid items-start gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Spinner className="mr-2" size={16} />}
          {initialData ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};
