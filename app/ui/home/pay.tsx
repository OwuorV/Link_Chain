// components/PaystackButton.tsx
"use client";

import { useEffect } from "react";

type PaystackButtonProps = {
  email: string;
  amount: number;
  metadata?: Record<string, any>;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
};

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const PaystackButton: React.FC<PaystackButtonProps> = ({
  email,
  amount,
  metadata = {},
  onSuccess,
  onClose,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payWithPaystack = () => {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      alert("Paystack not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: "NGN",
      metadata,
      callback: (response: { reference: string }) => {
        onSuccess?.(response.reference);
      },
      onClose: () => {
        onClose?.();
      },
    });

    handler.openIframe();
  };

  return (
    <button
      className="w-full bg-green-700 text-white py-2 cursor-pointer rounded-full"
      onClick={payWithPaystack}
    >
      Pay Kash{amount}
    </button>
  );
};

export default PaystackButton;
