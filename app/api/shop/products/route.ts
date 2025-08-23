// app/api/shop/products/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const shop = await db.shop.findUnique({
      where: {
        ownerId: session.userId,
      },
      include: {
        products: {
          include: {
            seller: {
              select: {
                name: true,
                email: true,
                SellerId: true,
              },
            },
            _count: {
              select: {
                Order: true,
                CartItem: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!shop) {
      return NextResponse.json(
        { error: "Shop not found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      shop: {
        id: shop.id,
        businessName: shop.businessName,
        storeName: shop.storeName,
        location: shop.location,
        productsCount: shop.products.length,
      },
      products: shop.products,
    });
  } catch (error) {
    console.error("Error fetching shop products:", error);
    return NextResponse.json(
      { error: "Failed to fetch shop products" },
      { status: 500 }
    );
  }
}

// app/api/shop/dashboard/route.ts - Add this as a separate file
