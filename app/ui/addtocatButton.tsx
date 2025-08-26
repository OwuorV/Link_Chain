"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string | null;
}

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          productName,
          productPrice,
          productImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      const result = await response.json();
      toast.success("Added to cart successfully!");

      // Optional: Update cart count in header/navbar
      // You can dispatch a custom event or use a state management solution
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border rounded-lg">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-2 border-x">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-2 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-xl shadow flex items-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Adding...
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
