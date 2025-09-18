import { Button } from "@/components/ui/button";
import Container from "@/components/widgets/container/Container";
import { getOrderById } from "@/lib/actions/order/order.actions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PaymentConfirmation = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  const order = await getOrderById(id);

  if (!order) {
    console.log("Order not found");
    return notFound();
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  console.log(paymentIntent);

  if (
    paymentIntent.metadata.orderId === null ||
    paymentIntent.metadata.orderId !== id.toString()
  ) {
    console.log("Payment Intent does not match order");
    return notFound();
  }

  const isSuccess = paymentIntent.status === "succeeded";

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <Container className="max-w-4xl w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Thank you for your purchase!</h1>
      <p>Your payment was successful.</p>

      <Button asChild>
        <Link href={`/order/${id}`}>View Order Details (Order #{id})</Link>
      </Button>
    </Container>
  );
};

export default PaymentConfirmation;
