import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});
  await prisma.user.deleteMany({});

  // seed categories & users (flat, no relations)
  await prisma.category.createMany({ data: sampleData.categories });
  await prisma.user.createMany({ data: sampleData.users });

  // seed products (need relations)
  for (const product of sampleData.products) {
    const { categoryIds, ...rest } = product;
    await prisma.product.create({
      data: {
        ...rest,
        categories: categoryIds
          ? { connect: categoryIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  console.log("Database seeded with sample data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
