"use client";

import { useState } from "react";
import Personal from "./shopComponents/personal";
import Location from "./shopComponents/location";
import StoreDetails from "./shopComponents/storeDetails";
import PaymentAndTerms from "./shopComponents/payment";

export default function AddShop() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = async () => {
    setSuccess(false);
    setError(false);
    const res = await fetch("/api/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to submit form");
      setError(true);
      throw new Error("Failed to create product");
      setFormData({
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
      return;
    }
    setSuccess(true);
    alert("Form submitted successfully");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
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
