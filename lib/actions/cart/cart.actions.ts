"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Item } from "@/lib/types/item.types";
import {
  convertToPlainObject,
  formatError,
  roundTwoDecimalPlaces,
} from "@/lib/utils";
import {
  cartItemValidator,
  insertCartSchema,
} from "@/lib/validators/cart.validator";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

//Calculate cart prices
const SHIPPING_FEE = 10;
const TAX_RATE = 0.21;

const calcPrice = (items: Item[]) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const shippingPrice = roundTwoDecimalPlaces(
    itemsPrice > 100 ? 0 : SHIPPING_FEE
  );
  const taxPrice = roundTwoDecimalPlaces(TAX_RATE * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export const addItemToCart = async (data: Item) => {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session ID not found");
    const session = await auth();
    const userId = session?.user.id ? session.user.id : null;

    const cart = await getCartItems();
    const item = cartItemValidator.parse(data);

    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    }

    const carItems = cart.items as Item[];
    const findItem = carItems.find((i) => i.id === item.id);

    if (findItem) {
      if (product.stock < findItem.quantity + item.quantity) {
        return {
          success: false,
          message: "Not enough stock available",
        };
      }
      carItems.find((i) => i.id === item.id)!.quantity += findItem.quantity + 1;
    } else {
      if (product.stock < 1) throw new Error("Not enough stock available");
      carItems.push(item);
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: carItems,
        ...calcPrice(carItems),
      },
    });

    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} ${
        findItem ? "updated in cart" : "added to cart"
      }`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: formatError(error),
    };
  }
};

export const getCartItems = async () => {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session ID not found");

    const session = await auth();
    const userId = session?.user?.id ?? null;

    const where = userId ? { userId } : { sessionCartId };
    const cart = await prisma.cart.findFirst({ where });

    if (!cart) {
      return null;
    }

    return convertToPlainObject({
      ...cart,
      items: cart.items ?? [],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    });
  } catch (error) {
    return null;
  }
};
