import image1 from "@/public/broiler.jpg";
import image2 from "@/public/layer.jpg";
import image3 from "@/public/kales.jpg";
import image4 from "@/public/maize.jpg";
import image5 from "@/public/cabbage.avif";
import image6 from "@/public/cereals.jpg";
import image7 from "@/public/chicks.avif";
import image8 from "@/public/broiler.jpg";
import image9 from "@/public/broiler.jpg";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function Vets() {
  const FarmCards = [
    {
      id: 1,
      cartegory1: "Animals",
      cartegory2: "Chicken",
      Name: "Layers Chicken",
      Vendor: "Otieno John",
      Location: "Siaya",
      price: 850,
      quantity: "5 months",
      image: image1,
    },
    {
      id: 2,
      cartegory1: "Animals",
      cartegory2: "Chicken",
      Name: "Broiler Chicken",
      Vendor: "Onyango Tarus",
      Location: "Migori",
      price: 690,
      quantity: "8 weeks",
      image: image2,
    },
    {
      id: 3,
      cartegory1: "Groceries",
      cartegory2: "Kales",
      Name: "Fresh Vegetables",
      Vendor: "Mirriam Shulale",
      Location: "Kisumu",
      price: 230,
      quantity: "1 Bag",
      image: image3,
    },
    {
      id: 4,
      cartegory1: "Plants",
      cartegory2: "Cerials",
      Name: "Maize",
      Vendor: "Kondim Tarus",
      Location: "Nairobi",
      price: 570,
      quantity: "1 Bag",
      image: image4,
    },
    {
      id: 5,
      cartegory1: "Vegetables",
      cartegory2: "Cabbage",
      Name: "Fresh Cabbage",
      Vendor: "Maya John",
      Location: "Siaya",
      price: 180,
      quantity: "1 bag",
      image: image5,
    },
    {
      id: 6,
      cartegory1: "Plants",
      cartegory2: "Legumes",
      Name: "Dried Beans",
      Vendor: "Nganguaye John",
      Location: "Kisii",
      price: 480,
      quantity: "1 Bag",
      image: image6,
    },
    {
      id: 7,
      cartegory1: "Farm Produce",
      cartegory2: "Eggs",
      Name: "Fresh Kienyeji Eggs",
      Vendor: "Leroy Sane",
      Location: "Siaya",
      price: 300,
      quantity: "1 trey",
      image: image7,
    },
    {
      id: 8,
      cartegory1: "Farm Produce",
      cartegory2: "Milk",
      Name: "Fresh Milk",
      Vendor: "Leroy Sane",
      Location: "Kisumu",
      price: 450,
      quantity: "10 Litres",
      image: image8,
    },
    {
      id: 9,
      cartegory1: "Animals",
      cartegory2: "Rabbits",
      Name: "White German Rabbits",
      Vendor: "Salah Mainoo",
      Location: "Kenya",
      price: 1100,
      quantity: "3 months",
      image: image9,
    },
  ];

  return (
    <main className="flex justify-center align-center m-2 w-full">
      <div className="farmGrid self-center grid grid-cols-1 md:grid-cols-4 gap-y-15 gap-x-10 w-full ">
        {FarmCards.map(
          ({
            id,
            cartegory1,
            cartegory2,
            Name,
            Vendor,
            Location,
            price,
            image,
            quantity,
          }) => (
            <div
              className="relative w-full h-[449px] farmcard flex flex-col justify-center shadow-lg itmes-center overflow-hidden  border-[#4F7396]/80 border-solid border-[0.4px] rounded-[12px]"
              key={id}
            >
              <div className="w-full h-full relative flex items-center justify-center overflow-hiden">
                <Image src={image} alt={Name} fill className="object-cover" />
              </div>
              <div
                className="cardInfo relative h-[220px] flex flex-col"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute  bg-[#000]/20 backdrop-blur-sm h-full w-[100%]"></div>
                <div className="relative z-10 flex flex-col  justify-center h-full text-left text-black p-4">
                  <span className="cartegories text-[#4F7396]">
                    {cartegory1} . {cartegory2}
                  </span>
                  <span className="Name text-[24px] font-semibold text-[#171821]">
                    {Name}
                  </span>
                  <span className="Name text-[14px] font-semibold text-[#4F7396]">
                    {quantity}
                  </span>
                  <span className="price text-[22px] font-medium">
                    <span className="text-[#4F7396] text-[14px] font-regular">
                      Price :
                    </span>
                    KES{price}
                  </span>
                  <span className="Vendor text-[#4F7396]">
                    Vendor: {Vendor}
                  </span>
                  <span className="location text-[#4F7396] flex">
                    <MapPinIcon className="w-5 h-5 text-gray-500" /> {Location}
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
