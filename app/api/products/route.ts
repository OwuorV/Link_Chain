import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Verify session
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse FormData
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const userId = formData.get("userId") as string;
    const sellerId = formData.get("sellerId") as string;
    const shopName = formData.get("shopName") as string;
    const image = formData.get("image") as File | null;

    // Validate inputs
    if (
      !name ||
      isNaN(price) ||
      !category ||
      !description ||
      !userId ||
      !sellerId
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Verify userId matches session
    if (userId !== session.userId) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 403 });
    }

    // Verify seller belongs to user
    const seller = await db.seller.findFirst({
      where: { id: sellerId, userId },
    });

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found or unauthorized" },
        { status: 403 }
      );
    }

    // Verify shop exists for user
    const shop = await db.shop.findFirst({
      where: { ownerId: userId, storeName: shopName },
    });

    if (!shop) {
      return NextResponse.json(
        { error: "Shop not found or unauthorized" },
        { status: 403 }
      );
    }

    // Handle image upload to Cloudinary
    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
      imageUrl = (result as any).secure_url;
    }

    // Create product
    const product = await db.product.create({
      data: {
        name,
        price,
        category,
        description,
        sellerId,
        imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
