import image1 from "@/public/broiler.jpg";
import image2 from "@/public/layer.jpg";
import image3 from "@/public/kales.jpg";
import image4 from "@/public/maize.jpg";
import image5 from "@/public/cabbage.avif";
import image6 from "@/public/cereals.jpg";
import image7 from "@/public/chicks.avif";
import image8 from "@/public/broiler.jpg";
import image9 from "@/public/broiler.jpg";
import { FaTruck } from "react-icons/fa";
import Image from "next/image";
import { getShops } from "@/lib/getShop";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default async function Vets() {
  const ServiceCards = [];

  try {
    ServiceCards.push(...(await getShops()));
  } catch (error) {
    console.error("Error fetching shops:", error);
    ServiceCards.length = 0;
  }

  return (
    <main className="flex justify-center mt-3 align-center w-full">
      <div className="farmGrid self-center grid grid-cols-1 md:grid-cols-3 gap-y-15 gap-x-10 w-full ">
        {ServiceCards.map(
          ({
            id,
            fullName,
            storeName,
            location,
            deliveryArea,
            storeBanner,
            storeLogo,
          }) => (
            <div
              className="relative w-full h-[449px] farmcard flex flex-col justify-center shadow-lg itmes-center overflow-hidden  border-[#4F7396]/80 border-solid border-[0.4px] rounded-[15px]"
              key={id}
            >
              <div className="w-full h-[220px] relative flex items-center justify-center overflow-hiden object-cover">
                <Image
                  src={storeBanner ?? "/fallback.jpg"}
                  alt={fullName}
                  fill
                  className="object-cover"
                />
                <div className="absolute overlay w-full h-full bg-[#000]/40 z-10"></div>
              </div>
              <div
                className="cardInfo relative h-full flex flex-col gap-5"
                style={{ backgroundImage: `url(${storeLogo})` }}
              >
                <div className="absolute  bg-[#000]/20 backdrop-blur-sm h-full w-[100%]"></div>
                <div className="relative z-10 flex flex-col  justify-center h-full text-left text-black p-4 gap-3">
                  <div className="mt-[-98px] top-[100px] imagelogo w-[100px] h-[100px] overflow-hidden bg-black border-3 border-[#D9D9D9] rounded-[50%]">
                    {/* <Image
                      src={storeLogo ?? "/fallback.png"}
                      alt={fullName}
                      fill
                      className="object-cover w-full h-full"
                    /> */}
                  </div>
                  <span className="Name text-[24px] font-semibold text-[#171821]">
                    {fullName}
                  </span>
                  <span className="shop-Name text-[14px] font-semibold text-[#4F7396]">
                    {storeName}
                  </span>

                  <span className="text-[#4F7396] text-[14px] font-regular">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    {location}
                  </span>
                  <span className="flex Vendor gap-3 text-[#4F7396]">
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {/* {cartegory2} */}
                    </span>
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {/* {cartegories1}{" "} */}
                    </span>
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {/* {cartegory3} */}
                    </span>
                  </span>
                  <div className="h-[1px] w-full border-b border-b-gray-200"></div>
                  <span className="location text-[#4F7396] flex gap-3">
                    <FaTruck className="text-gray-600 text-xl" />
                    {deliveryArea}
                  </span>
                  <div className="w-full botomButtons flex justify-between px-5 mt-3">
                    <button className="bg-white rounded-[12px] px-4 py-2 text-black-200 ">
                      Visit Shop
                    </button>
                    <button className="bg-white rounded-[12px] px-4 py-2 text-black-200 ">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
