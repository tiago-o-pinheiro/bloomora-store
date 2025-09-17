// /components/Checkout.tsx
"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SERVER_URL } from "@/lib/constants/constants";
import { Order } from "@/lib/types/order.type";
import { formatCurrency } from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutInner = ({ order }: { order: Order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${SERVER_URL}/order/${order.id}/confirmation/`,
      },
    });

    if (error) setError(error.message ?? "Payment failed");
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <PaymentElement options={{ layout: "accordion" }} />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button onClick={onPay} disabled={!stripe || loading} className="w-full">
        {loading ? "Processing…" : `Pay – ${formatCurrency(order.totalPrice)}`}
      </Button>
    </div>
  );
};

const Checkout = ({ order }: { order: Order }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntent = async () => {
      const res = await fetch("/api/stripe/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    };

    fetchIntent();
  }, [order.id]);

  if (order.isPaid) return null;

  if (!clientSecret) return <Skeleton className="w-full h-24" />;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutInner order={order} />
    </Elements>
  );
};

export default Checkout;
