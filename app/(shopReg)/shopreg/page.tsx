"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Personal from "./shopComponents/personal";
import Location from "./shopComponents/location";
import StoreDetails from "./shopComponents/storeDetails";
import PaymentAndTerms from "./shopComponents/payment";

export default function AddShop() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // ✅ Include File | null for images
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    location: "",
    deliveryArea: "",
    storeName: "",
    storeDescription: "",
    storeLogo: null as File | null,
    storeBanner: null as File | null,
    paymentMethod: "",
    legalAccepted: false,
  });

  // Redirect if user already has a shop
  useEffect(() => {
    const checkShop = async () => {
      try {
        const res = await fetch("/api/shop", { method: "GET" });
        if (!res.ok) throw new Error("Failed to check shop");

        const data = await res.json();
        if (data.hasShop) {
          router.push("/Dashboard");
        } else {
          setLoading(false);
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
    setError(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          fd.append(key, value);
        } else {
          fd.append(key, String(value));
        }
      }
    });

    try {
      const res = await fetch("/api/shop", {
        method: "POST",
        body: fd, // 👈 always FormData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create shop");
      }

      setSuccess(true);
      router.push("/Dashboard");
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#000]/80 backdrop-blur">
        <div className="flex flex-col gap-3 items-center justify-center max-w-[300px] w-[300px] h-[240px] max-h-[240px] bg-white rounded-lg shadow-lg">
          <p>Checking your shop status...</p>
          <button className="bg-blue-800 rounded-lg p-2">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-start p-4">
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
  );
}
