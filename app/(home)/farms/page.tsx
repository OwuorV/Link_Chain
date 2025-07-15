// /app/vets/page.tsx
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/lib/getproduct";
// import type { Product } from "@/lib/types";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Vets() {
  const products = await getProducts();

  return (
    <main className="flex flex-col items-center mt-3 w-full px-4">
      <h1 className="text-3xl font-bold text-center text-[#0f0] mb-5">
        Welcome to The Market Place
      </h1>
      <div className="p">
        <p className="text-[16px] text-center max-w-[600px] text-[#000] mb-5 mt-5">
          Discover a wide range of products from local vendors, including fresh
          produce, handmade crafts, and more. Support local businesses and find
          unique items that you won't find anywhere else.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl">
        {products.map(
          ({ id, name, category, description, imageUrl, price }) => (
            <div
              key={id}
              className="relative w-full h-[450px] flex flex-col shadow-lg items-center overflow-hidden border-[#4F7396]/80 border-[0.4px] rounded-xl"
            >
              <div className="absolute inset-0 bg-[#fff]/80 backdrop-blur-lg z-0" />
              <div className="relative w-[94%] h-2/3 mt-2 mx-2">
                <Image
                  src={imageUrl ?? "/fallback.jpg"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-t-xl"
                  priority={false}
                  alt=""
                />
              </div>
              <div className="relative flex flex-col p-4 text-left text-black w-full">
                <span className="text-sm text-[#4F7396]">
                  {category} • {name}
                </span>
                <h2 className="text-xl font-semibold text-[#171821]">{name}</h2>
                <p className="text-sm text-[#4F7396] line-clamp-2">
                  {description || "No description available"}
                </p>
                <span className="text-lg font-medium">
                  <span className="text-sm text-[#4F7396]">Price: </span>
                  KES {price.toFixed(2)}
                </span>
                <span className="text-sm text-[#4F7396]">Vendor: Unknown</span>
                <span className="text-sm text-[#4F7396] flex items-center gap-1">
                  <MapPinIcon
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Kenya
                </span>
              </div>
              <button className="absolute rounded bottom-2 right-2 bg-green-600  mb-2 mx-2 text-white px-4 py-2 hover:bg-green-900  transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
    </main>
  );
}
