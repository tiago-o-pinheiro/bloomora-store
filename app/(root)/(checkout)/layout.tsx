"use client";

import CheckoutSteps from "@/components/widgets/checkout-steps/CheckoutSteps";

import { CHECKOUT_STEPS } from "./constants";
import { usePathname } from "next/navigation";

const getActiveStep = (pathname: string) => {
  const slug = pathname.split("/").pop() || "";
  const step = CHECKOUT_STEPS.find((step) => step.slug === slug);
  return step ? step.value : 1;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen flex-col">
      <CheckoutSteps
        activeStep={getActiveStep(pathname)}
        checkoutSteps={CHECKOUT_STEPS}
      />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
