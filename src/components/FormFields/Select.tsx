import AsyncSelect from "react-select/async";
import Select from "react-select";
import { defaultClassNames, defaultStyles } from "@/helpers/ReactSelectStyles";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectOptions } from "@/models/ReactSelect";

interface SelectProps {
  name: string;
  label: string;
  placeholder?: string;
  isMultiSelect?: boolean;
  control: any; // TODO: A better typing.
  options?: SelectOptions;
  loadOptions?: (inputValue: string, callback: (options: any) => void) => void; // TODO: A better typing.
}

const SelectAsync = ({
  name,
  label,
  placeholder,
  isMultiSelect = false,
  control,
  loadOptions,
}: SelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AsyncSelect
              {...field}
              cacheOptions
              classNames={defaultClassNames}
              defaultOptions
              isMulti={isMultiSelect}
              loadOptions={loadOptions}
              loadingMessage={(obj) =>
                obj.inputValue
                  ? `Looking for ${obj.inputValue}...`
                  : "Loading..."
              }
              placeholder={placeholder}
              styles={defaultStyles}
              unstyled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SelectNormal = ({ name, label, options, control }: SelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              classNames={defaultClassNames}
              options={options}
              styles={defaultStyles}
              unstyled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SelectAsync, SelectNormal as Select };
