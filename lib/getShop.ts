import { db } from "@/lib/db"; // Changed from prisma to db

export async function getShops() {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return shops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
}
