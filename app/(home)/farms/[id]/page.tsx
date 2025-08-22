// app/farms/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      seller: true,
      Shop: true,
    },
  });

  if (!product) {
    notFound();
  }
  let relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    take: 4,
  });

  // Fallback: If less than 2 related, fetch random products instead
  if (relatedProducts.length < 2) {
    relatedProducts = await prisma.product.findMany({
      where: { NOT: { id: product.id } },
      orderBy: { createdAt: "desc" }, // could also randomize later
      take: 4,
    });
  }
  if (relatedProducts.length === 0) {
    relatedProducts = await prisma.product.findMany({
      take: 4,
    });
  }
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg">KSH {product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Shop Info (optional) */}
          {product && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h2 className="font-semibold">Seller Info</h2>
              <p>{product.seller?.name}</p>
              <p className="text-sm text-gray-600">
                {product.seller ? product.seller.phone : "Unknown"}
              </p>
            </div>
          )}
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {relatedProducts.some((rp) => rp.category === product.category)
              ? "Related Products"
              : "You Might Also Like"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/farms/${rp.id}`}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
              >
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-3">
                  {rp.imageUrl ? (
                    <img
                      src={rp.imageUrl}
                      alt={rp.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800">{rp.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {rp.description}
                </p>
                <p className="text-green-700 font-bold mt-2">KSH {rp.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
