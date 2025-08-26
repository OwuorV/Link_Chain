import Image from "next/image";
import josefinSans from "@/app/ui/font";
import { getCart } from "@/lib/getCart";
import { selectCartesianItemsSettings } from "recharts/types/state/selectors/axisSelectors";
export default async function Cart() {
  const cartItems = await getCart();

  try {
    cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
  let cartTotal = cartItems.reduce((total, item) => {
    return total + item.productPrice * item.quantity;
  }, 0);
  const itemTotals = cartItems.map((item) => item.productPrice * item.quantity);

  return (
    <>
      <div className={`w-full md:max-w-[80%] md:px-18 ${josefinSans.variable}`}>
        <h1>Your Cart</h1>
        <div className="mt-[30px] mx-auto flex px-1 space-y-4  flex-col gap-4 md:flex-row lg:gap-8 w-full justify-center">
          <div className="w-full flex-1 flex-col gap-3 space-y-4 md:w-full lg:space-y-8">
            {cartItems.map(
              ({
                id,
                userId,
                productId,
                quantity,

                productPrice,
                productImage,
                productName,
              }) => (
                <div
                  key={id}
                  className="relative flex  w-full  items-center justify-between"
                >
                  <div className="border-b pb-3 flex gap-4 w-full mb-3 border-b-[0.5px] md:w-[70%] justify-between border-b-gray-300 sm:justify-between">
                    <div className="w-full max-w-[150px] h-[220px] relative flex items-center rounded-lg justify-center overflow-hidden object-cover">
                      {" "}
                      <Image
                        src={productImage ?? "/fallback.png"}
                        alt={productName}
                        fill
                        className="object-cover "
                      />
                    </div>
                    <div className="flex flex-col  justify-center">
                      <span className="text-base font-semibold">
                        {productName}
                      </span>
                      <span className="font-semibold">
                        <span className="flex gap-2">
                          quantity:
                          <span className="text-sm text-gray-500">
                            {quantity}
                          </span>
                        </span>
                      </span>

                      <div> price{productPrice}</div>
                      <span className="font-semibold">
                        <span className="flex gap-2">
                          SubTotal:
                          <div className="text-sm text-gray-500">
                            {productPrice * quantity} Kes
                          </div>
                        </span>
                      </span>
                      <span className="text-red-500 cursor-pointer ">
                        remove item
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="w-full md:w-2/5 2xl:max-w-[470px]">
            <div className="rounded-lg  border-[0.5px] border-gray-300 m-auto p-4  md:border md:px-5 md:py-10 lg:mt-12">
              <div className="lg:px-6 flex flex-col gap-4">
                {" "}
                <span className="text-sm font-normal  text-gray-400">
                  The items in your cart arent reserved and their availability
                  might change
                </span>
                <div className="mt-4 flex flex-col gap-2 justify-between">
                  <span className="text-base font-semibold text-gray-600">
                    🚛 shipping cost
                  </span>
                  <div className="text-base font-light text-gray-600">
                    <p>calculated on checkout</p>
                  </div>
                </div>
                <div className="mt-4 border-b border-b-gray-300 border-b-[0.5px]"></div>
                <div className="mt-4 flex flex-col gap-2 justify-between">
                  <span className="text-base font-semibold text-gray-600">
                    Total
                  </span>
                  <div className="text-base font-semibold text-gray-600">
                    {cartTotal.toFixed(2)} KES
                  </div>
                </div>
                <div className="mt-4 border-b border-b-gray-300 border-b-[0.5px]"></div>
                <button className="w-full bg-green-700 text-white py-2 rounded-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
