import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// const DB_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.DATABASE_URL
//     : process.env.DATABASE_URL_PROD;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
