"use server";
import { prisma } from "@/db/prisma";
import { logger } from "@/lib/helpers/logger";

import { shippingAddressSchema } from "@/lib/validators/shipping-address.validator";
import { z } from "zod";

export const getShippingAddressByUserId = async (userId: string) => {
  try {
    const address = await prisma.shippingAddress.findFirst({
      where: {
        userId,
      },
    });
    return {
      success: true,
      data: address,
    };
  } catch (error) {
    logger.error("Error getting shipping address", { error });
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Shipping Address not found",
    };
  }
};

export const saveShippingAddress = async (userId: string, address: unknown) => {
  try {
    const existingAddress = await getShippingAddressByUserId(userId);
    const shippingAddress = shippingAddressSchema.parse(address);
    logger.debug("Validated shipping address", { shippingAddress });

    if (existingAddress?.data) {
      // Update existing address
      const response = await prisma.shippingAddress.update({
        where: { id: existingAddress?.data?.id },
        data: {
          ...shippingAddress,
          userId,
        },
      });

      return {
        success: true,
        data: response,
      };
    } else {
      // Create new address
      const response = await prisma.shippingAddress.create({
        data: {
          ...shippingAddress,
          userId,
        },
      });

      return {
        success: true,
        data: response,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid shipping address",
      };
    }
    logger.error("Error saving shipping address", { error });
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error saving shipping address",
    };
  }
};
