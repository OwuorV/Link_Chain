"use client";
import { useState, useEffect } from "react";

type Product = {
  name: string;
  price: number;
  category: string;
  description: string;
  userId?: string;
  sellerId?: string;
  shopName?: string;
};

const categories = [
  "Poultry",
  "Cereals",
  "Crops",
  "Vegetables",
  "Fruits",
  "Livestock",
  "Dairy Products",
  "Fish & Aquaculture",
  "Herbs & Spices",
  "Nuts & Seeds",
  "Tubers & Roots",
  "Legumes & Pulses",
  "Honey & Bee Products",
  "Fiber Crops (Cotton, Sisal)",
  "Ornamental Plants & Flowers",
  "Medicinal Plants",
  "Beverage Crops (Tea, Coffee, Cocoa)",
  "Oil Crops (Sunflower, Canola, Sesame)",
  "Mushrooms",
];

export default function Products() {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: "",
    userId: "",
    sellerId: "",
    shopName: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user and seller details
  useEffect(() => {
    async function fetchUserAndSellerData() {
      try {
        const res = await fetch("app/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send session cookie
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const { userId, sellerId, shopName } = await res.json();

        if (!userId || !sellerId || !shopName) {
          throw new Error("Incomplete user or seller data");
        }

        setFormData((prev) => ({
          ...prev,
          userId,
          sellerId,
          shopName,
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user/seller data:", err);
        setError(
          "Failed to load user or seller data. Please log in or register as a seller."
        );
        setLoading(false);
      }
    }

    fetchUserAndSellerData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!formData.userId || !formData.sellerId) {
      setError("User or seller information is missing.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price.toString());
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("userId", formData.userId);
    form.append("sellerId", formData.sellerId);
    form.append("shopName", formData.shopName || "");
    if (image) {
      form.append("image", image);
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include", // Send session cookie
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error: ${res.status}`);
      }

      setSuccess(true);
      setFormData({
        name: "",
        price: 0,
        category: "",
        description: "",
        userId: formData.userId,
        sellerId: formData.sellerId,
        shopName: formData.shopName,
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong during submission."
      );
    }
  }

  if (loading) {
    return <div>Loading user and seller data...</div>;
  }

  if (error && !formData.userId) {
    return (
      <div className="bg-red-100 text-red-800 p-3 rounded-md">
        ❌ {error}{" "}
        <a href="/seller/login" className="underline">
          Please log in
        </a>{" "}
        or{" "}
        <a href="/seller/register" className="underline">
          register as a seller
        </a>
        .
      </div>
    );
  }

  return (
    <div className="w-full h-full px-[40px] gap-[20px] py-[16px] flex flex-col justify-center items-center">
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md">
          ✅ Product submitted successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">❌ {error}</div>
      )}
      <div className="w-full md:w-[698px] max-w-[600px] gap-4 p-[16px] h-max flex-col border-[#004]/30 border-1 items-center border-solid flex rounded-[23px] bg-[#165D25]/10 self-center">
        <h1 className="text-[28px] text-left text-[#088738] font-[700]">
          Create New Product
        </h1>
        <p className="text-base font-[500] text-[#171821]">
          Add new product or service to the marketplace
        </p>
        <p className="text-[#4F7396] w-full text-left text-1xl font-[500]">
          Basic Information
        </p>
        {formData.shopName && (
          <p className="text-[#171821] text-base">
            Adding product for: <strong>{formData.shopName}</strong>
          </p>
        )}

        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full p-4"
          >
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border-[#171821]/30 border-[1px] p-2 rounded-[12px]"
              required
            />

            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border-[#171821]/30 border-[1px] p-2 rounded-[12px]"
              min="0"
              step="0.01"
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded max-w-[480px] flex flex-col gap-4 text-base text-[#4F7396]"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label>Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              required
              onChange={handleChange}
              placeholder="Product Description"
              className="border-[#171821]/30 border-[1px] p-2 rounded-[12px]"
              rows={4}
            />

            <label>Upload Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border-[#171821]/30 border-[1px] p-2 rounded-[12px]"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded-[12px] max-h-[200px] object-cover"
              />
            )}

            <button
              type="submit"
              className="bg-[#088738] text-white p-2 cursor-pointer rounded-[12px]"
            >
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
