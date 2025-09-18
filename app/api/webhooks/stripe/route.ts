import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order/order.actions";

export const POST = async (req: NextRequest) => {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const orderId = charge.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in charge metadata");
      return NextResponse.json({
        success: false,
        message: "No orderId in charge metadata",
      });
    }

    try {
      const updatedOrder = await updateOrderToPaid({
        orderId,
        paymentResult: {
          id: charge.id,
          status: "COMPLETED",
          pricePaid: parseFloat((charge.amount / 100).toFixed(2)),
          email_address: charge.receipt_email || "",
        },
      });
      console.log("Order updated to paid:", updatedOrder);
      return NextResponse.json({
        success: true,
        message: "Order updated successfully",
      });
    } catch (error) {
      console.error("Failed to update order to paid:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update order" },
        { status: 500 }
      );
    }
  }

  console.log(`Unhandled Stripe event received: ${event.type}`);
  return NextResponse.json({
    success: true,
    message: `Unhandled event type: ${event.type}`,
  });
};
