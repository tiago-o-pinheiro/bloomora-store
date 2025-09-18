import z from "zod";
import {
  insertOrderItemSchema,
  insertOrderSchema,
  orderPaymentResultSchema,
} from "../validators/order.validator";

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: {
    email: string;
    name: string;
  };
};

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type OrderPaymentResult = z.infer<typeof orderPaymentResultSchema>;
