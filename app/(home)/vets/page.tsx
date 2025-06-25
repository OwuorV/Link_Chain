import { FaGlobe } from "react-icons/fa";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Logos (replace with real logos or placeholder images in /public)
import image1 from "@/public/equity.svg";
import image2 from "@/public/apollo.jpeg";
import image3 from "@/public/images.png";
import image4 from "@/public/one acre fund.jpg";
import image5 from "@/public/hellotractor.png";
import image6 from "@/public/mkoppa.png";
import image7 from "@/public/iprocure.jpeg";
import image8 from "@/public/agunity.png";
import image9 from "@/public/worldbank.jpg";

export default function FinancialProviders() {
  const providers = [
    {
      id: 1,
      name: "Equity Bank",
      type: "Bank",
      location: "Nairobi, Kenya",
      services: ["Loans", "Agri-Financing", "Mobile Banking"],
      logo: image1,
      website: "https://equitybank.co.ke",
    },
    {
      id: 2,
      name: "Apollo Agriculture",
      type: "Agri-Fintech",
      location: "Nairobi, Kenya",
      services: ["Input Credit", "Insurance", "SMS Support"],
      logo: image2,
      website: "https://www.apolloagriculture.com",
    },
    {
      id: 3,
      name: "Pezesha",
      type: "Loan Platform",
      location: "Nairobi, Kenya",
      services: ["MSME Loans", "Investment Access", "Financial Literacy"],
      logo: image3,
      website: "https://www.pezesha.com",
    },
    {
      id: 4,
      name: "One Acre Fund",
      type: "Investor / NGO",
      location: "Kakamega, Kenya",
      services: ["Farm Loans", "Seed Support", "Training"],
      logo: image4,
      website: "https://oneacrefund.org",
    },
    {
      id: 5,
      name: "Hello Tractor",
      type: "Tech + Finance",
      location: "Lagos, Nigeria / Nairobi",
      services: ["Tractor Financing", "Booking Platform", "Investor Pool"],
      logo: image5,
      website: "https://www.hellotractor.com",
    },
    {
      id: 6,
      name: "M-KOPA",
      type: "Credit Platform",
      location: "Nairobi, Kenya",
      services: ["Solar Loans", "Smartphone Financing", "Instant Credit"],
      logo: image6,
      website: "https://www.m-kopa.com",
    },
    {
      id: 7,
      name: "iProcure",
      type: "Agri Supply Chain",
      location: "Nairobi, Kenya",
      services: ["Input Credit", "Supplier Financing"],
      logo: image7,
      website: "https://www.iprocure.co.ke",
    },
    {
      id: 8,
      name: "AgUnity",
      type: "Digital Platform",
      location: "Global / Remote",
      services: ["Farmer Wallet", "Partnered Finance"],
      logo: image8,
      website: "https://www.agunity.com",
    },
    {
      id: 9,
      name: "FinDev Gateway",
      type: "Knowledge Hub",
      location: "Washington, DC",
      services: ["Financial Access", "Global Listings", "Research"],
      logo: image9,
      website: "https://www.findevgateway.org",
    },
  ];

  return (
    <main className="flex justify-center align-center m-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-y-12 gap-x-6 w-full max-w-[1200px]">
        {providers.map(
          ({ id, name, type, location, services, logo, website }) => (
            <div
              className="relative w-full h-max md:h-[220px] md:flex md:justify-left shadow-md overflow-hidden border-[#4F7396]/80 border-[0.4px] rounded-[15px] bg-white"
              key={id}
            >
              <div className="w-full md:w-[30%] md:h-full h-[220px] relative flex items-center justify-center overflow-hiden object-cover">
                <Image src={logo} alt={name} className="object-cover" fill />
              </div>
              <div className="p-4 flex flex-col gap-3  w-full md:flex justify-between">
                <div className="services md:h-full md:flex md:flex-col md:justify-between ">
                  <h3 className="text-[20px] font-semibold text-[#171821]">
                    {name}
                  </h3>
                  <p className="text-[14px] font-medium text-[#4F7396]">
                    {type}
                  </p>
                  <div className="flex items-center gap-1 text-gray-600 text-[13px]">
                    <MapPinIcon className="w-4 h-4" />
                    {location}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-[#d9d9d9] border-solid border-[0.4px] border-[#165D25]/40 px-3 py-1 text-[11px] rounded-[12px]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between md:justify-end h-max gap-2 mt-4">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#165D25] text-white px-4 py-2 rounded-[12px] text-sm"
                  >
                    Visit Website
                  </a>
                  <button className="bg-white border px-4 py-2 rounded-[12px] text-sm text-[#4F7396]">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
