import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/db/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: Request) => {
  const { orderId, email } = (await req.json()) as {
    orderId: string;
    email?: string;
  };

  // 1. Look up the order from DB
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // 2. Convert to integer cents
  const total =
    typeof order.totalPrice === "string"
      ? parseFloat(order.totalPrice)
      : order.totalPrice;
  const amount = Math.round(total * 100);

  // 3. Create PI with secure amount
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    automatic_payment_methods: { enabled: false },
    payment_method_types: ["card"],
    metadata: { orderId },
    ...(email ? { receipt_email: email } : {}),
  });

  return NextResponse.json({ clientSecret: intent.client_secret });
};
