// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

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

    // 2️⃣ Get shop & seller details for logged-in user
    const shop = await db.shop.findFirst({
      where: { ownerId: session.userId },
      select: { id: true, storeName: true },
    });

    if (!shop) {
      return NextResponse.json(
        { error: "Shop not found for this user" },
        { status: 404 }
      );
    }

    const seller = await db.seller.findFirst({
      where: { userId: session.userId }, // Query Seller model using userId
      select: { id: true },
    });

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found for this user" },
        { status: 404 }
      );
    }

    // 3️⃣ Parse product form data
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
    const image = formData.get("image") as File | null;

    const name = typeof rawName === "string" ? rawName.trim() : "";
    const price = typeof rawPrice === "string" ? parseFloat(rawPrice) : NaN;
    const category = typeof rawCategory === "string" ? rawCategory.trim() : "";
    const description =
      typeof rawDescription === "string" ? rawDescription.trim() : "";

    // Log parsed values for diagnostics
    console.log("Parsed values:", {
      name: name || null,
      priceRaw: rawPrice,
      priceParsed: price,
      category: category || null,
      description: description || null,
      imageInfo: image ? { name: image.name, size: image.size } : null,
      sessionUserId: session.userId,
    });

    // 4️⃣ Validate input
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
    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }
    if (image && image.size > 3 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size exceeds 3MB limit" },
        { status: 400 }
      );
    }

    // 5️⃣ Upload image to Cloudinary (if provided)
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

    // 6️⃣ Create product
    const product = await db.product.create({
      data: {
        name,
        price,
        category,
        description,
        imageUrl,
        sellerId: seller.id, // Use Seller.id from the query
        shopName: shop.storeName || "", // Fallback to empty string if null
        shopOwnerId: session.userId,
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
