"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import {
  CART_OUT_OF_STOCK,
  GENERIC_ERROR,
  PRODUCT_NOT_FOUND,
} from "@/lib/constants/error-codes.constants";
import { logger } from "@/lib/helpers/logger";
import { Cart } from "@/lib/types/cart.type";
import { Item } from "@/lib/types/item.type";
import {
  convertToPlainObject,
  formatError,
  roundTwoDecimalPlaces,
} from "@/lib/utils";

import {
  cartItemSchema,
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

export const getSessionCartId = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionCartId")?.value;
};

export const addItemToCart = async (data: Item) => {
  try {
    const sessionCartId = await getSessionCartId();
    if (!sessionCartId) throw new Error("Cart session ID not found");

    const session = await auth();
    const sessionUserId = session?.user?.id ?? null;

    // CHANGED: verify user exists in DB to avoid FK violation
    const dbUser = sessionUserId
      ? await prisma.user.findUnique({ where: { id: sessionUserId } })
      : null;
    const userId = dbUser?.id ?? null;

    const cart = (await getCartItems()) as Cart | null;
    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    if (!product) {
      return {
        success: false,
        message: `${PRODUCT_NOT_FOUND} - Product not found`,
      };
    }

    if (!cart) {
      if (product.stock < item.quantity) {
        return {
          success: false,
          message: `${CART_OUT_OF_STOCK} - Not enough stock available`,
        };
      }

      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: {
          ...newCart,
          userId: userId ?? undefined,
        },
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    }

    const cartItems = cart.items as Item[];
    const findItem = cartItems.find((i) => i.id === item.id);

    if (findItem) {
      if (product.stock < findItem.quantity + item.quantity) {
        return {
          success: false,
          message: `${CART_OUT_OF_STOCK} - Not enough stock available`,
        };
      }
      // CHANGED: add requested quantity, not +1
      cartItems.find((i) => i.id === item.id)!.quantity =
        findItem.quantity + item.quantity;
    } else {
      if (product.stock < item.quantity) {
        return {
          success: false,
          message: `${CART_OUT_OF_STOCK} - Not enough stock available`,
        };
      }
      cartItems.push(item);
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cartItems,
        ...calcPrice(cartItems),
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
    logger.error("Error adding item to cart", { error });
    return {
      success: false,
      message: `${GENERIC_ERROR} - ${formatError(error)}`,
    };
  }
};

export const getCartItems = async (): Promise<Cart | null> => {
  try {
    const sessionCartId = await getSessionCartId();
    if (!sessionCartId) throw new Error("Cart session ID not found");

    const session = await auth();
    const sessionUserId = session?.user?.id ?? null;

    // CHANGED: only use userId if it exists in DB; else fall back to sessionCartId
    const dbUser = sessionUserId
      ? await prisma.user.findUnique({ where: { id: sessionUserId } })
      : null;

    const where = dbUser?.id ? { userId: dbUser.id } : { sessionCartId };
    const cart = await prisma.cart.findFirst({ where });

    if (!cart) {
      return null;
    }

    return convertToPlainObject({
      ...cart,
      items: (cart.items ?? []) as Item[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    });
  } catch (error) {
    logger.error("Error fetching cart items", { error });
    return null;
  }
};

export const removeItemFromCart = async (productId: string) => {
  try {
    const sessionCartId = await getSessionCartId();
    if (!sessionCartId) throw new Error("Cart session ID not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    const cart = (await getCartItems()) as Cart | null;
    if (!cart) {
      throw new Error("Cart not found");
    }

    const exist = cart.items.find((item) => item.id === productId);
    if (!exist) {
      throw new Error("Item not found in cart");
    }
    if (exist.quantity === 1) {
      cart.items = cart.items.filter((item) => item.id !== productId);
    } else {
      cart.items = cart.items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: `${GENERIC_ERROR} - ${formatError(error)}`,
    };
  }
};
