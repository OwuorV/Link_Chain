// Create a new API route: app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { paramsToSign } = await request.json();

    // Generate signature for client-side upload
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error generating signature:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}

// Then in your frontend component:
const uploadImageDirectly = async (file: File): Promise<string | null> => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      timestamp,
      folder: "products",
    };

    // Get signature from your API
    const signatureResponse = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: params }),
    });

    const { signature } = await signatureResponse.json();

    // Upload directly to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "products");
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await uploadResponse.json();
    return result.secure_url;
  } catch (error) {
    console.error("Direct upload failed:", error);
    return null;
  }
};
