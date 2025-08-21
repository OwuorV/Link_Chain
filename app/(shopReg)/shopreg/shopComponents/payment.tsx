"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  data: any;
  update: (newData: any) => void;
  submit: () => Promise<void>;
  back: () => void;
};

export default function PaymentAndTerms({ data, update, submit, back }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    try {
      await submit(); // your submit function handles API call
      toast.success("Shop registered successfully!");

      // clear form
      update({
        paymentMethod: "",
        legalAccepted: false,
      });

      // redirect after short delay
      setTimeout(() => {
        router.push("/Dashboard"); // change to your desired route
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to register shop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 w-full h-full justify-center items-center">
      <div className=" flex justify-center">
        <div className="flex flex-col items-center gap-3 p-5  w-full backdrop-blur h-max rounded-3xl p-3">
          <h2 className="text-xl font-semibold mb-4">
            Payment & Legal Requirements
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 p-5  w-full backdrop-blur h-max rounded-3xl p-3"
          >
            <div className="w-full max-w-[480px] flex flex-col gap-3">
              <label>Mpesa Number</label>

              <input
                className="border p-2 w-full mb-2 rounded-full"
                placeholder="Payment Method"
                value={data.paymentMethod}
                onChange={(e) => update({ paymentMethod: e.target.value })}
              />
            </div>
            <label className="flex items-center mt-4 w-full max-w-[480px] mb-4">
              <input
                className=""
                type="checkbox"
                checked={data.legalAccepted}
                onChange={(e) => update({ legalAccepted: e.target.checked })}
              />
              <span className="ml-2 ">I accept the terms and conditions</span>
            </label>

            <div className="w-full  max-w-[480px] flex  justify-between">
              <button
                onClick={back}
                className="bg-gray-800 rounded-full text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-full"
                disabled={loading}
              >
                {loading ? "Submitting... please wait" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="info p-5 m-4 bg-white grid grid-cols-1">
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-400 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            ✅
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Personal & Business Details</p>
            <p className="text-gray-600">Tell us about Your Business</p>
          </div>
        </div>
        <div className="h-[40px] border-l w-[40px]  border-l-green-600 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-400 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            ✅
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Location Details</p>
            <p className="text-gray-600">Shop location and delivery Location</p>
          </div>
        </div>
        <div className="h-[40px] w-[40px] border-l border-l-green-600 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-600 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            ✅
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Store Details</p>
            <p className="text-gray-500">About your Store</p>
          </div>
        </div>
        <div className="h-[40px] w-[40px] border-l border-l-green-600 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-600 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            4
          </div>
          <div className="flex flex-col">
            <p className="text-green-500">PAyment Details</p>
            <p className="text-gray-500">
              Give your details to Receive Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
