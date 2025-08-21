import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const seller = await db.seller.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    const shop = await db.shop.findFirst({
      where: { ownerId: user.id },
      select: { storeName: true },
    });

    if (!shop || !shop.storeName) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      sellerId: seller.id,
      shopName: shop.storeName,
      UserName: user.name,
    });
  } catch (error) {
    console.error("Error fetching user/seller data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
