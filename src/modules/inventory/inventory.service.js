import { prisma } from "../../lib/prisma.js";

export async function getProducts() {
  return prisma.product.findMany({
    include: { category: true, unit: true },
    orderBy: { id: "asc" },
  });
}

export async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, unit: true },
  });
}
