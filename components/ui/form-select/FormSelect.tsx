import { FieldValues, Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

type FormSelectProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  fieldDescription?: string;
  label: string;
  name: K;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
};

const FormSelect = <T extends FieldValues, K extends Path<T>>({
  control,
  fieldDescription,
  label,
  name,
  options,
  defaultValue,
}: FormSelectProps<T, K>) => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent defaultValue={defaultValue}>
                {(options || []).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldDescription && (
              <FormDescription>{fieldDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default FormSelect;
