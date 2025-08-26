// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs"; // Added for password hashing

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const validCategories = [
  "Poultry",
  "Cereals",
  "Crops",
  "Vegetables",
  "Fruits",
  "Livestock",
  "Dairy",
  "Herbs & Spices",
  "Seeds & Seedlings",
  "Fish",
  "Honey & Beekeeping",
] as const;

export async function POST(request: Request) {
  try {
    // 1️⃣ Verify session
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Get user details
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3️⃣ Get or create seller
    let seller = await db.seller.findFirst({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!seller) {
      seller = await db.seller.create({
        data: {
          SellerId: `seller-${randomUUID()}`,
          userId: session.userId,
          name: user.name || "Unnamed Seller",
          email: user.email,
          password: await bcrypt.hash(user.password, 10), // Hash the user's password
          phone: null, // Optional, set if available
        },
      });
      console.log(`Created Seller record for user ${session.userId}:`, seller);
    }

    // 4️⃣ Get or create shop
    let shop = await db.shop.findFirst({
      where: { ownerId: session.userId },
      select: { id: true, storeName: true },
    });

    if (!shop) {
      shop = await db.shop.create({
        data: {
          ownerId: session.userId,
          fullName: user.name || "Unnamed Owner",
          businessName: "Default Shop",
          businessEmail: user.email,
          storeName: "Default Store",
          legalAccepted: true,
        },
      });
      console.log(`Created Shop record for user ${session.userId}:`, shop);
    }

    // 5️⃣ Parse product form data
    const formData = await request.formData();

    // Debug FormData entries
    try {
      const entries = Array.from(formData.entries()).map(([key, value]) => {
        if (value instanceof File) {
          return { key, fileName: value.name, fileSize: value.size };
        }
        return { key, value };
      });
      console.log(
        "Received FormData entries:",
        JSON.stringify(entries, null, 2)
      );
    } catch (e) {
      console.error("Error serializing FormData entries:", e);
    }

    const rawName = formData.get("name");
    const rawPrice = formData.get("price");
    const rawCategory = formData.get("category");
    const rawDescription = formData.get("description");
    const rawLongDescription = formData.get("longDescription");
    const image = formData.get("image") as File | null;

    const name = typeof rawName === "string" ? rawName.trim() : "";
    const price = typeof rawPrice === "string" ? parseFloat(rawPrice) : NaN;
    const category = typeof rawCategory === "string" ? rawCategory.trim() : "";
    const description =
      typeof rawDescription === "string" ? rawDescription.trim() : "";
    const longDescription =
      typeof rawLongDescription === "string" ? rawLongDescription.trim() : "";

    // Log parsed values for diagnostics
    console.log("Parsed values:", {
      name: name || null,
      priceRaw: rawPrice,
      priceParsed: price,
      category: category || null,
      description: description || null,
      imageInfo: image ? { name: image.name, size: image.size } : null,
      sessionUserId: session.userId,
      shopName: shop.storeName || null,
    });

    // 6️⃣ Validate input
    if (!name) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    }
    if (!category || !validCategories.includes(category as any)) {
      return NextResponse.json(
        { error: "Valid category is required" },
        { status: 400 }
      );
    }
    // if (!description) {
    //   return NextResponse.json(
    //     { error: "Description is required" },
    //     { status: 400 }
    //   );
    // }
    if (image && image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // 7️⃣ Upload image to Cloudinary (if provided)
    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!);
          }
        );
        uploadStream.end(buffer);
      });
      imageUrl = result.secure_url;
    }

    // 8️⃣ Create product
    const product = await db.product.create({
      data: {
        name,
        price,
        category,
        description,
        longDescription,
        imageUrl,
        sellerId: seller.id,
      },
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creating product:",
      error instanceof Error ? error.stack : error
    );
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
