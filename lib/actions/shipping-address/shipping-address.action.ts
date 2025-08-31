"use server";
import { prisma } from "@/db/prisma";
import { ShippingAddress } from "@/lib/types/shipping-address.type";
import { shippingAddressValidator } from "@/lib/validators/shipping-address.validator";

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
    console.error("Error getting shipping address:", error);
    return {
      success: false,
      message: "Shipping Address not found",
    };
  }
};

export const saveShippingAddress = async (userId: string, address: unknown) => {
  const existingAddress = await getShippingAddressByUserId(userId);
  const shippingAddress = shippingAddressValidator.parse(address);
  console.log(shippingAddress);

  if (!shippingAddress) {
    return {
      success: false,
      message: "Invalid shipping address",
    };
  }

  try {
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
    console.error("Error saving shipping address:", error);
    return {
      success: false,
      message: "Error saving shipping address",
    };
  }
};
