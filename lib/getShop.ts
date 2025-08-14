import { prisma } from "@/lib/prisma";

export async function getShops() {
  const shops = await prisma.shop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return shops;
}
