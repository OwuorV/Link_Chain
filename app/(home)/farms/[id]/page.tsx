import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import type { NextPage } from "next";

// Updated props to match Next.js App Router expectations
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Explicitly type the page component
const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  // Await the params Promise
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) return notFound();

  const { products: relatedProducts, title } = await getRelatedProducts(
    product.id,
    product.category || ""
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row px-4 gap-8 mb-12">
        <div className="relative w-full rounded-2xl md:w-150 h-130">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover shadow"
            />
          ) : (
            <div className="w-full h-full flex rounded-2xl items-center justify-center bg-gray-200">
              <Image
                alt="Fallback image"
                src="/fallback.jpg"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="w-full md:max-w-[460px]">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">Ksh {product.price}</p>
          <div>
            <p className="font-medium text-gray-700 underline">
              Product Description
            </p>
            <p className="text-base text-gray-600 tracking-tight leading-6 mb-4">
              {product.longDescription ||
                "No additional description available."}
            </p>
          </div>

          {product.seller && (
            <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Seller</h2>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {product.seller.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {product.seller.email}
              </p>
              <div>
                <Link href={`/`} className="text-blue-500 hover:underline">
                  View Seller Profile
                </Link>
              </div>
            </div>
          )}

          {product.Shop && product.Shop.length > 0 && (
            <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Available In Shops</h2>
              {product.Shop.map((shop) => (
                <p key={shop.id} className="text-gray-700">
                  {shop.storeName} – {shop.location}
                </p>
              ))}
            </div>
          )}

          <Link
            href={`/checkout/${product.id}`}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl shadow"
          >
            Buy Now
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/farms/${item.id}`}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={item.imageUrl || "/fallback.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">Ksh {item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

async function getProduct(id: string) {
  try {
    return await db.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        longDescription: true,
        price: true,
        imageUrl: true,
        category: true,
        seller: {
          select: { id: true, name: true, email: true },
        },
        Shop: {
          select: { id: true, storeName: true, location: true },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(productId: string, category: string) {
  try {
    const related = await db.product.findMany({
      where: { category, NOT: { id: productId } },
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });

    if (related.length > 0) {
      return { products: related, title: "Related Products" };
    }

    const fallback = await db.product.findMany({
      where: { NOT: { id: productId } },
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });

    return { products: fallback, title: "You Might Also Like" };
  } catch (error) {
    console.error("Error fetching related products:", error);
    return { products: [], title: "You Might Also Like" };
  }
}
