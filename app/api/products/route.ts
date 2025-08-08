import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { getUser } from "@/lib/dal"; // ✅ your custom auth

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Product schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // ✅ Check if user is logged in
    const user = await getUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in to post a product" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    const validatedData = productSchema.parse({
      name,
      price,
      category,
      description,
    });

    let imageUrl = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "marketplace" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      imageUrl = (uploadResult as any).secure_url;
    }

    // ✅ Create product linked to logged-in user
    const newProduct = await prisma.product.create({
      data: {
        name: validatedData.name,
        price: validatedData.price,
        category: validatedData.category,
        description: validatedData.description || "",
        imageUrl,
        sellerId: user.id, // ✅ your custom auth user id
      },
    });

    revalidatePath("/farms", "page");

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
