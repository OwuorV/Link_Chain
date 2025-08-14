import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";

// app/seller/profile/page.tsx
import { getProducts } from "@/lib/getproduct";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Vets() {
  const products = await getProducts();

  if (!products) {
    console.log("No products found");

    return (
      <main className="flex flex-col items-center mt-3 w-full px-4">
        <h1 className="text-3xl font-bold text-center text-[#0f0] mb-4">
          No Products Available
        </h1>
        <p className="text-[16px] text-center max-w-[600px] text-[#000] mb-5 mt-5">
          Currently, there are no products available in the marketplace. Please
          check back later.
        </p>
      </main>
    );
  } else {
    console.log("Products found:", products);
    return (
      <main className="flex flex-col items-center mt-3 w-full px-4">
        <div className="header flex flex-col md:flex-row md:justify-between w-full">
          <div className="max-sm mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Market Place
            </h1>
            <div className="p">
              <p className="text-muted-foreground mt-1">
                Discover a wide range of products from local vendors. Across
                different Categories
                <br />
              </p>
            </div>
          </div>
          <div className="filter flex w-[100px] h-max p-1 px-2 border border-[#4F7396]/80 rounded-lg ">
            <FunnelIcon className="h-6 w-6 mr-1" />
            Filter
          </div>
        </div>
        <div className="grid grid-cols-1 max-sm:px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-7 gap-6">
          {products.map(
            ({
              id,
              name,
              category,
              description,
              imageUrl,
              price,
              sellerId,
            }) => (
              <div
                key={id}
                className="relative w-full h-[450px] flex flex-col shadow-lg items-center overflow-hidden border-[#cad2cd]/80 border-[0.4px] rounded-3xl"
              >
                <div className="absolute inset-0 bg-[#fff]/80 backdrop-blur-lg z-0" />
                <div className="relative w-[100%] h-1/2">
                  <Image
                    src={imageUrl ?? "/fallback.jpg"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-t-xl"
                    priority={false}
                    alt=""
                  />
                </div>
                <div className="relative flex flex-col p-4 text-left text-black w-full bg-[#e5e7e6]">
                  <span className="text-sm text-[#4F7396] mb-2">
                    {category}{" "}
                    <span className="text-[#4F7396] text-4xl ">.</span> {name}
                  </span>
                  <h2 className="text-xl font-semibold text-[#171821] mb-2">
                    {name}
                  </h2>
                  <p className="text-sm text-[#4F7396] line-clamp-2 mb-2">
                    {description || "No description available"}
                  </p>
                  <span className="text-lg font-medium">
                    <span className="text-sm font-normal text-[#4F7396]">
                      Price{"  "}
                    </span>
                    {price.toFixed(2)} KES
                  </span>
                  <span className="text-sm text-[#4F7396] mb-2">
                    Vendor: {sellerId}
                  </span>
                  <span className="text-sm text-[#4F7396] flex items-center gap-1">
                    Siaya{" "}
                    <MapPinIcon
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <button className="absolute rounded-3xl bottom-2 cursor-pointer right-2 bg-green-600  mb-2 mx-2 text-white px-4 py-2 hover:bg-green-900  transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            )
          )}
        </div>
      </main>
    );
  }
}
