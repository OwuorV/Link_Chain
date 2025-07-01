"use client";
import { useState } from "react";
import React from "react";

type Product = {
  name: string;
  price: number;
  category: string;
  description: string;
};

const categories = ["Poultry", "Cereals", "Vegetables", "Fruits", "Livestock"];

export default function Products() {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price.toString());
    form.append("category", formData.category);
    form.append("description", formData.description);
    if (image) {
      form.append("image", image);
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to create product");

      setSuccess(true); // ✅ Show success alert
      setFormData({ name: "", price: 0, category: "", description: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Submission error:", err);
      setError(true); // ❌ Show error alert
    }
  }

  return (
    <div className="w-full h-full px-[40px] gap-[20px] py-[16px] flex flex-col justify-center items-center">
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md">
          ✅ Product submitted successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          ❌ Something went wrong.
        </div>
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
              onClick={handleSubmit}
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
