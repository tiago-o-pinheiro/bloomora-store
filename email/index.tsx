import { Resend } from "resend";
import { SENDER_EMAIL, APP_NAME } from "@/lib/constants/constants";
import { Order } from "@/lib/types/order.type";
import doenv from "dotenv";
import PurchaseReceiptEmail from "./components/PurchaseReceipt";

doenv.config();

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendPurchaseReceiptParams = {
  order: Order;
};

export const sendPurchaseReceipt = async ({
  order,
}: SendPurchaseReceiptParams) => {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: order.user.email,
      subject: `Your receipt from ${APP_NAME}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
  } catch (error) {
    console.error("Failed to send purchase receipt email:", error);
  }
};
