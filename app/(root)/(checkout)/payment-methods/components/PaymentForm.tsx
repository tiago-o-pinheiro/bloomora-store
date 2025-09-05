"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/ui/form-select/FormSelect";
import { updateUserPaymentMethod } from "@/lib/actions/user/user.actions";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS,
} from "@/lib/constants/constants";
import { PaymentMethods } from "@/lib/types/payment-methods.types";
import { paymentMethodSchema } from "@/lib/validators/payment-methods.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const usePaymentMethods = () => {
  return PAYMENT_METHODS.map((method) => ({
    value: method,
    label: method,
  }));
};

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: PaymentMethods["type"] | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PaymentMethods>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const paymentMethods = usePaymentMethods();

  const onSubmit: SubmitHandler<PaymentMethods> = async (data) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(data);
      if (res.success === false) {
        toast.error(res.message || "Failed to save payment method.");
      } else {
        toast.success("Payment method updated successfully!");
        router.push("/place-order");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSelect
          label="Select your preferred payment method"
          control={form.control}
          name="type"
          options={paymentMethods}
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentMethodForm;
