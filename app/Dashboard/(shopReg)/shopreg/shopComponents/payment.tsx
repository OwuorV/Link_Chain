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
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">
        Payment & Legal Requirements
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Payment Method"
        value={data.paymentMethod}
        onChange={(e) => update({ paymentMethod: e.target.value })}
      />

      <label className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={data.legalAccepted}
          onChange={(e) => update({ legalAccepted: e.target.checked })}
        />
        <span className="ml-2">I accept the terms and conditions</span>
      </label>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={back}
          className="bg-gray-400 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting... please wait" : "Submit"}
        </button>
      </div>
    </form>
  );
}
