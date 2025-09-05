"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { getSessionUser, getUserById } from "../user/user.actions";
import { getCartItems } from "../cart/cart.actions";
import { getShippingAddressByUserId } from "../shipping-address/shipping-address.action";
import { insertOrderSchema } from "@/lib/validators/order.validator";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "@/lib/utils";

export const createOrder = async () => {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.id) {
      throw new Error("User not authenticated");
    }
    const cart = await getCartItems();
    const userId = sessionUser.id;
    const { data: user } = await getUserById(userId);
    const { data: shippingAddress } = await getShippingAddressByUserId(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }

    if (!shippingAddress) {
      return {
        success: false,
        message: "Your shipping address is missing",
        redirectTo: "/shipping-address",
      };
    }

    if (!user?.paymentMethod) {
      return {
        success: false,
        message: "Your payment method is missing",
        redirectTo: "/payment-methods",
      };
    }

    //Create the order object

    const order = insertOrderSchema.parse({
      userId: userId,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      paymentMethod: user.paymentMethod,
      shippingAddressId: shippingAddress.id,
      status: "PENDING",
    });

    //Create a transaction to create order and order items

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: order,
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            productId: item.id,
            image: item.image,
            name: item.name,
            slug: item.slug,
            quantity: item.quantity,
            price: item.price,
          },
        });
      }

      //Clear the items in the cart
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: [],
          totalPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          itemsPrice: 0,
        },
      });

      return createdOrder.id;
    });

    if (!insertedOrderId) {
      return {
        success: false,
        message: "Failed to create order",
      };
    }

    return {
      success: true,
      message: "Order created successfully",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Failed to create order",
    };
  }
};

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        orderItems: true,
        user: { select: { email: true, name: true } },
      },
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }
    return {
      success: true,
      data: convertToPlainObject(order),
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};
