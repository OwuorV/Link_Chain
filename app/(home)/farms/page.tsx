// app/ui/vets/Vets.tsx or app/vets/page.tsx (depending on structure)
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/lib/getproduct";

export default async function Vets() {
  const products = await getProducts();

  return (
    <main className="flex justify-center align-center mt-3 w-full">
      <div className="farmGrid self-center grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 w-full ">
        {products.map(
          ({ id, name, category, description, imageUrl, price, createdAt }) => (
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              className="relative w-full h-[449px]  farmcard flex flex-col justify-center shadow-lg itmes-center overflow-hidden  border-[#4F7396]/80 border-solid border-[0.4px] rounded-[12px]"
              key={id}
            >
              <div className="absolute bg-[#fff]/80 backdrop-blur-lg h-full w-full"></div>
              <div className="w-[94%] h-full relative flex items-center rounded-t-[10px] mt-[10px] mx-[10px] justify-center overflow-hiden">
                <Image
                  src={imageUrl || "/fallback.jpg"}
                  alt={name}
                  fill
                  className="object-cover rounded-t-[10px]"
                />
              </div>
              <div
                className="cardInfo relative h-max flex flex-col"
                // style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <div className="relative z-10 flex flex-col justify-center h-full text-left text-black p-4">
                  <span className="cartegories text-[#4F7396]">
                    {category}. {name}
                  </span>
                  <span className="Name text-[24px] font-semibold text-[#171821]">
                    {name}
                  </span>
                  <span className="Name text-[14px] font-semibold text-[#4F7396]">
                    Description: {description}{" "}
                  </span>
                  <span className="price text-[22px] font-medium">
                    <span className="text-[#4F7396] text-[14px] font-regular">
                      Price :
                    </span>{" "}
                    KES{price}
                  </span>
                  <span className="Vendor text-[#4F7396]">Vendor: {name} </span>
                  <span className="location text-[#4F7396] flex">
                    <MapPinIcon className="w-5 h-5 text-gray-500" /> Kenya
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}

//   return (
//     <main className="flex justify-center align-center m-2 w-full">
//       <div className="farmGrid self-center grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 w-full ">
//         {FarmCards.map(
//           ({
//             id,
//             cartegory1,
//             cartegory2,
//             Name,
//             Vendor,
//             Location,
//             price,
//             image,
//             quantity,
//           }) => (
//             <div
//               className="relative w-full h-[449px] farmcard flex flex-col justify-center shadow-lg itmes-center overflow-hidden  border-[#4F7396]/80 border-solid border-[0.4px] rounded-[12px]"
//               key={id}
//             >
//               <div className="w-full h-full relative flex items-center justify-center overflow-hiden">
//                 <Image src={image} alt={Name} fill className="object-cover" />
//               </div>
//               <div
//                 className="cardInfo relative h-[220px] flex flex-col"
//                 style={{ backgroundImage: `url(${image})` }}
//               >
//                 <div className="absolute  bg-[#000]/20 backdrop-blur-sm h-full w-[100%]"></div>
//                 <div className="relative z-10 flex flex-col  justify-center h-full text-left text-black p-4">
//                   <span className="cartegories text-[#4F7396]">
//                     {cartegory1} . {cartegory2}
//                   </span>
//                   <span className="Name text-[24px] font-semibold text-[#171821]">
//                     {Name}
//                   </span>
//                   <span className="Name text-[14px] font-semibold text-[#4F7396]">
//                     {quantity}
//                   </span>
//                   <span className="price text-[22px] font-medium">
//                     <span className="text-[#4F7396] text-[14px] font-regular">
//                       Price :
//                     </span>
//                     KES{price}
//                   </span>
//                   <span className="Vendor text-[#4F7396]">
//                     Vendor: {Vendor}
//                   </span>
//                   <span className="location text-[#4F7396] flex">
//                     <MapPinIcon className="w-5 h-5 text-gray-500" /> {Location}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </main>
//   );
// }
