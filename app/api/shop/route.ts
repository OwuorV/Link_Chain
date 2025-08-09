import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Verify user session
    const session = await verifySession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const {
      fullName,
      businessName,
      businessPhone,
      businessEmail,
      location,
      deliveryArea,
      storeName,
      storeDescription,
      storeLogo,
      storeBanner,
      paymentMethod,
      legalAccepted,
    } = body;

    if (!fullName || !businessName || !businessEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save shop to DB
    const shop = await db.shop.create({
      data: {
        ownerId: session.userId,
        fullName,
        businessName,
        businessPhone,
        businessEmail,
        location,
        deliveryArea,
        storeName,
        storeDescription,
        storeLogo,
        storeBanner,
        paymentMethod,
        legalAccepted,
      },
    });

    return NextResponse.json({ success: true, shop }, { status: 201 });
  } catch (error) {
    console.error("Error creating shop:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
