import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany({});

  await prisma.product.createMany({ data: sampleData.products });

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
