import { FieldValues, Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../form";
import { Textarea } from "../textarea";

type FormTextareaProps<T extends FieldValues, K extends Path<T>> = {
  label: string;
  placeholder?: string;
  control: Control<T>;
  name: K;
  fieldDescription?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const FormTextarea = <T extends FieldValues, K extends Path<T>>({
  label,
  placeholder,
  control,
  name,
  fieldDescription,
  disabled,
  children,
}: FormTextareaProps<T, K>) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 w-full">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Textarea
                  className="resize-none"
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
                {children}
              </div>
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
export default FormTextarea;
