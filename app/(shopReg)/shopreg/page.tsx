"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Personal from "./shopComponents/personal";
import Location from "./shopComponents/location";
import StoreDetails from "./shopComponents/storeDetails";
import PaymentAndTerms from "./shopComponents/payment";

export default function AddShop() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // To avoid flicker before check
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    location: "",
    deliveryArea: "",
    storeName: "",
    storeDescription: "",
    storeLogo: "",
    storeBanner: "",
    paymentMethod: "",
    legalAccepted: false,
  });

  // Redirect if user already has a shop
  useEffect(() => {
    const checkShop = async () => {
      try {
        const res = await fetch("/api/shop", { method: "GET" });
        // /api/shop/user should return { hasShop: true/false }
        if (!res.ok) throw new Error("Failed to check shop");

        const data = await res.json();
        if (data.hasShop) {
          router.push("/Dashboard");
        } else {
          setLoading(false); // Show form
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    checkShop();
  }, [router]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = async () => {
    setSuccess(false);
    setError(" ");
    const res = await fetch("/api/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      setError("none");
      throw new Error("Failed to create shop");
    }
    setSuccess(true);
    router.push("/Dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#000]/80 backdrop-blur">
        <div className=" flex flex-col gap-3 items-center justify-center max-w-[300px] w-[300px] h-[240px] max-h-[240px] bg-white rounded-lg shadow-lg">
          <p>Checking your shop status...</p>
          <button className="bg-blue-800 rounded-lg p-2">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen  flex justify-center items-start p-4 w-full">
        {step === 1 && (
          <Personal data={formData} update={updateFormData} next={nextStep} />
        )}
        {step === 2 && (
          <Location
            data={formData}
            update={updateFormData}
            next={nextStep}
            back={prevStep}
          />
        )}
        {step === 3 && (
          <StoreDetails
            data={formData}
            update={updateFormData}
            next={nextStep}
            back={prevStep}
          />
        )}
        {step === 4 && (
          <PaymentAndTerms
            data={formData}
            update={updateFormData}
            submit={submitForm}
            back={prevStep}
          />
        )}
      </div>
    </>
  );
}
//
