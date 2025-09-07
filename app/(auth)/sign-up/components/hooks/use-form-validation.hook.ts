import { parseZodErrors } from "@/lib/utils";
import { signUpSchema } from "@/lib/validators/sign-up.valitador";
import { useState, useTransition } from "react";

export type FieldErrors = Record<string, string[] | undefined>;

export const useFormValidation = (action: (fd: FormData) => void) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries()) as Record<string, string>;

    const parsed = signUpSchema.safeParse(values);
    if (!parsed.success) {
      const { fieldErrors, formErrors } = parseZodErrors(parsed.error);
      setErrors({ ...fieldErrors, form: formErrors });
      return;
    }

    startTransition(() => {
      action(fd);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return { handleSubmit, errors, isPending, handleChange };
};
