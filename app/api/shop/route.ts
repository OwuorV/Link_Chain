import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Helper: upload to Cloudinary
async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function GET() {
  try {
    const session = await verifySession();
    if (!session?.userId) {
      return NextResponse.json({ hasShop: false }, { status: 401 });
    }

    const shop = await db.shop.findUnique({
      where: { ownerId: session.userId },
      select: { id: true },
    });

    return NextResponse.json({ hasShop: !!shop });
  } catch (error) {
    console.error("Error checking shop:", error);
    return NextResponse.json({ hasShop: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await verifySession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Detect content-type
    const contentType = req.headers.get("content-type") || "";

    let fullName: string | null = null;
    let businessName: string | null = null;
    let businessPhone: string | null = null;
    let businessEmail: string | null = null;
    let location: string | null = null;
    let deliveryArea: string | null = null;
    let storeName: string | null = null;
    let storeDescription: string | null = null;
    let paymentMethod: string | null = null;
    let legalAccepted = false;
    let storeLogo: File | null = null;
    let storeBanner: File | null = null;

    if (contentType.includes("application/json")) {
      // JSON payload (no images)
      const body = await req.json();
      fullName = body.fullName;
      businessName = body.businessName;
      businessPhone = body.businessPhone || null;
      businessEmail = body.businessEmail;
      location = body.location || null;
      deliveryArea = body.deliveryArea || null;
      storeName = body.storeName || null;
      storeDescription = body.storeDescription || null;
      paymentMethod = body.paymentMethod || null;
      legalAccepted = body.legalAccepted === true;
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      // FormData payload (with optional images)
      const formData = await req.formData();
      fullName = formData.get("fullName") as string;
      businessName = formData.get("businessName") as string;
      businessPhone = formData.get("businessPhone") as string | null;
      businessEmail = formData.get("businessEmail") as string;
      location = formData.get("location") as string | null;
      deliveryArea = formData.get("deliveryArea") as string | null;
      storeName = formData.get("storeName") as string | null;
      storeDescription = formData.get("storeDescription") as string | null;
      paymentMethod = formData.get("paymentMethod") as string | null;
      legalAccepted = formData.get("legalAccepted") === "true";
      storeLogo = formData.get("storeLogo") as File | null;
      storeBanner = formData.get("storeBanner") as File | null;
    } else {
      return NextResponse.json(
        { error: "Unsupported Content-Type" },
        { status: 415 }
      );
    }

    // ✅ Validate required fields
    if (!fullName || !businessName || !businessEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Prevent duplicate shops
    const existingShop = await db.shop.findUnique({
      where: { ownerId: session.userId },
    });
    if (existingShop) {
      return NextResponse.json(
        { error: "You already have a shop" },
        { status: 400 }
      );
    }

    // ✅ Upload images if present
    let logoUrl: string | null = null;
    let bannerUrl: string | null = null;

    if (storeLogo) {
      if (storeLogo.size > 3 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Store logo exceeds 3MB limit" },
          { status: 400 }
        );
      }
      logoUrl = await uploadToCloudinary(storeLogo, "shops/logos");
    }

    if (storeBanner) {
      if (storeBanner.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Store banner exceeds 5MB limit" },
          { status: 400 }
        );
      }
      bannerUrl = await uploadToCloudinary(storeBanner, "shops/banners");
    }

    // ✅ Create shop
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
        storeLogo: logoUrl,
        storeBanner: bannerUrl,
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
