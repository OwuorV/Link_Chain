import { db } from "@/lib/db"; // Changed from prisma to db

export async function getCart() {
  try {
    const cartItems = await db.cart.findMany({
      orderBy: {
        productPrice: "desc",
      },
    });
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
}
