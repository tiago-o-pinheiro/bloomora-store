"use client";

import { Button } from "@/components/ui/button";
import { shippingAddressSchema } from "@/lib/validators/shipping-address.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import z from "zod";
import FormInput from "@/components/ui/form-input/FormInput";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { saveShippingAddress } from "@/lib/actions/shipping-address/shipping-address.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ShippingFormType = z.infer<typeof shippingAddressSchema>;

const DEFAULT_ADDRESS = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const ShippingForm = ({
  address,
  userId,
}: {
  address?: ShippingFormType;
  userId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ShippingFormType>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || DEFAULT_ADDRESS,
  });

  const onSubmit: SubmitHandler<ShippingFormType> = async (data) => {
    startTransition(async () => {
      const res = await saveShippingAddress(userId, data);
      if (res.success === false) {
        toast.error("Failed to save shipping address.");
      } else {
        toast.success("Shipping address saved successfully!");
        router.push("/payment-methods");
      }
    });
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Full name"
          placeholder="Full name"
          control={form.control}
          name="fullName"
        />
        <FormInput
          label="Address Line 1"
          placeholder="Address Line 1"
          control={form.control}
          name="addressLine1"
        />
        <FormInput
          label="Address Line 2"
          placeholder="Address Line 2"
          control={form.control}
          name="addressLine2"
        />
        <FormInput
          label="City"
          placeholder="City"
          control={form.control}
          name="city"
        />
        <FormInput
          label="State"
          placeholder="State"
          control={form.control}
          name="state"
        />
        <FormInput
          label="Country"
          placeholder="Country"
          control={form.control}
          name="country"
        />
        <FormInput
          label="Zip Code"
          placeholder="Zip Code"
          control={form.control}
          name="postalCode"
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}{" "}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShippingForm;
