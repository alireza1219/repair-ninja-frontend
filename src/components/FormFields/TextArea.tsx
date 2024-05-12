import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  className?: string;
  isResizable?: boolean;
}

const TextArea = ({
  name,
  label,
  placeholder,
  control,
  className,
  isResizable = true,
}: TextAreaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              className={cn(className, !isResizable && "resize-none")}
              placeholder={placeholder ? placeholder : "Write something..."}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { TextArea };
