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
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function Vets() {
  const ServiceCards = [
    {
      id: 1,
      Name: "Onyango Tete",
      shopName: "GreenFarm Supplies",
      location: "Siaya Town",
      cartegories1: "herbs",
      cartegory2: "wool",
      cartegory3: "beans",
      deliveryLocation: "Eldoret",
      burnerImage: image4,
      logo: image5,
    },
    {
      id: 2,
      Name: "Achieng Flora",
      shopName: "Fresh Harvest",
      location: "Kisumu",
      cartegories1: "wool",
      cartegory2: "rabbits",
      cartegory3: "milk",
      deliveryLocation: "Kitale",
      burnerImage: image5,
      logo: image3,
    },
    {
      id: 3,
      Name: "Mwangi Kip",
      shopName: "Happy Hens Market",
      location: "Nairobi",
      cartegories1: "maize",
      cartegory2: "eggs",
      cartegory3: "herbs",
      deliveryLocation: "Kakamega",
      burnerImage: image3,
      logo: image7,
    },
    {
      id: 4,
      Name: "Lilian Otieno",
      shopName: "AgroMart Siaya",
      location: "Eldoret",
      cartegories1: "vegetables",
      cartegory2: "beans",
      cartegory3: "wool",
      deliveryLocation: "Nairobi",
      burnerImage: image7,
      logo: image2,
    },
    {
      id: 5,
      Name: "Kamau Kariuki",
      shopName: "Eco Farm Store",
      location: "Migori",
      cartegories1: "vegetables",
      cartegory2: "herbs",
      cartegory3: "wool",
      deliveryLocation: "Kakamega",
      burnerImage: image2,
      logo: image6,
    },
    {
      id: 6,
      Name: "Wanjiru Kendi",
      shopName: "Choma Base",
      location: "Kakamega",
      cartegories1: "rabbits",
      cartegory2: "herbs",
      cartegory3: "wool",
      deliveryLocation: "Nairobi",
      burnerImage: image6,
      logo: image1,
    },
    {
      id: 7,
      Name: "Kevin Barasa",
      shopName: "Nature's Crate",
      location: "Thika",
      cartegories1: "vegetables",
      cartegory2: "eggs",
      cartegory3: "maize",
      deliveryLocation: "Migori",
      burnerImage: image1,
      logo: image9,
    },
    {
      id: 8,
      Name: "Sharon Muthoni",
      shopName: "Pure Produce",
      location: "Naivasha",
      cartegories1: "herbs",
      cartegory2: "beans",
      cartegory3: "wool",
      deliveryLocation: "Naivasha",
      burnerImage: image9,
      logo: image8,
    },
    {
      id: 9,
      Name: "Juma Felix",
      shopName: "Mama Mboga",
      location: "Kitale",
      cartegories1: "vegetables",
      cartegory2: "chicken",
      cartegory3: "herbs",
      deliveryLocation: "Naivasha",
      burnerImage: image8,
      logo: image4,
    },
    {
      id: 10,
      Name: "Mwangi Kip",
      shopName: "Happy Hens Market",
      location: "Nairobi",
      cartegories1: "tractor",
      cartegory2: "manual ploughing",
      cartegory3: "oxen services",
      deliveryLocation: "Kakamega",
      burnerImage: image3,
      logo: image4,
      role: "Plougher",
    },
    {
      id: 11,
      Name: "Brian Okoth",
      shopName: "AgriMove Logistics",
      location: "Kisumu",
      cartegories1: "livestock transport",
      cartegory2: "produce delivery",
      cartegory3: "bulk haulage",
      deliveryLocation: "Nationwide",
      burnerImage: image9,
      logo: image7,
      role: "Transporter",
    },
    {
      id: 12,
      Name: "Samuel Kiplangat",
      shopName: "Kip Hands On",
      location: "Eldoret",
      cartegories1: "weeding",
      cartegory2: "planting",
      cartegory3: "harvesting",
      deliveryLocation: "Uasin Gishu",
      burnerImage: image4, // Add a matching image11 asset
      logo: image1, // And its logo version
      role: "Manual Labourer",
    },
  ];

  return (
    <main className="flex justify-center align-center m-2 w-full">
      <div className="farmGrid self-center grid grid-cols-1 md:grid-cols-4 gap-y-15 gap-x-10 w-full ">
        {ServiceCards.map(
          ({
            id,
            Name,
            shopName,
            location,
            cartegories1,
            deliveryLocation,
            burnerImage,
            cartegory2,
            cartegory3,
            logo,
          }) => (
            <div
              className="relative w-full h-[449px] farmcard flex flex-col justify-center shadow-lg itmes-center overflow-hidden  border-[#4F7396]/80 border-solid border-[0.4px] rounded-[15px]"
              key={id}
            >
              <div className="w-full h-[220px] relative flex items-center justify-center overflow-hiden object-cover">
                <Image
                  src={burnerImage}
                  alt={Name}
                  fill
                  className="object-cover"
                />
                <div className="absolute overlay w-full h-full bg-[#000]/40 z-10"></div>
              </div>
              <div
                className="cardInfo relative h-full flex flex-col gap-5"
                style={{ backgroundImage: `url(${logo})` }}
              >
                <div className="absolute  bg-[#000]/20 backdrop-blur-sm h-full w-[100%]"></div>
                <div className="relative z-10 flex flex-col  justify-center h-full text-left text-black p-4 gap-3">
                  <div className="mt-[-98px] top-[100px] imagelogo w-[100px] h-[100px] overflow-hidden bg-black border-3 border-[#D9D9D9] rounded-[50%]">
                    <Image
                      src={logo}
                      alt={Name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="Name text-[24px] font-semibold text-[#171821]">
                    {Name}
                  </span>
                  <span className="shop-Name text-[14px] font-semibold text-[#4F7396]">
                    {shopName}
                  </span>

                  <span className="text-[#4F7396] text-[14px] font-regular">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    {location}
                  </span>
                  <span className="flex Vendor gap-3 text-[#4F7396]">
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {cartegory2}
                    </span>
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {cartegories1}{" "}
                    </span>
                    <span className="bg-[#d9d9d9] px-3 py-1 text-[11px] rounded-[12px]  ">
                      {cartegory3}
                    </span>
                  </span>
                  <div className="h-[1px] w-full border-b border-b-gray-200"></div>
                  <span className="location text-[#4F7396] flex gap-3">
                    <FaTruck className="text-gray-600 text-xl" />

                    {deliveryLocation}
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
