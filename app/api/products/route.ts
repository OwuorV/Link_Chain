// /app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path to match your project

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  // Optional: Handle image upload (Cloudinary or other)
  let imageUrl = "";
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");

    // Here you'd call your image hosting service
    // For now, let's simulate a URL
    imageUrl = `data:image/jpeg;base64,${base64}`;
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        category,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}
