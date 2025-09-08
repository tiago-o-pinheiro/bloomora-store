import { FieldValues, Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../form";
import { Input } from "@/components/ui/input";

type FormInputProps<T extends FieldValues, K extends Path<T>> = {
  label: string;
  placeholder?: string;
  control: Control<T>;
  name: K;
  fieldDescription?: string;
  disabled?: boolean;
};

const FormInput = <T extends FieldValues, K extends Path<T>>({
  label,
  placeholder,
  control,
  name,
  fieldDescription,
  disabled,
}: FormInputProps<T, K>) => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} disabled={disabled} />
            </FormControl>
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
export default FormInput;
