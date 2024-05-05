import { AxiosError } from "axios";
import { Category, categorySchema } from "@/models/Category";
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
  isUpdate?: boolean;
  onSubmit: (data: Category) => Promise<Category>;
}

export const CategoryForm = ({
  initialData,
  isPending = false,
  isUpdate = false,
  onSubmit,
}: CategoryFormProps) => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
      ? {
          id: initialData?.id || 0,
          title: initialData?.title || "",
        }
      : { title: "" },
  });

  // I'm not really happy with this approach.
  const submitHandler = async (data: Category) => {
    try {
      const response = await onSubmit(data);
      if (!isUpdate && response) {
        form.reset();
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const err = error.response;
        if (
          err &&
          err.status === 400 &&
          typeof err.data === "object" &&
          err.data.title
        ) {
          form.setError("title", {
            type: "manual",
            message: err.data.title[0],
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid items-start gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {/* The ID field is only present when updating a category title. */}
        {isUpdate && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
          {isUpdate ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};
