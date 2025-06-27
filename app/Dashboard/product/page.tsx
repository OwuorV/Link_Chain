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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) || 0 : value,
    }));
  };
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted Product:", formData);
    // handle save logic (API call etc.)
  }
  return (
    <div className="w-full h-full px-[40px] gap-[20px] py-[16px] flex flex-col justify-center items-center ">
      <div className=" w-full md:w-[698px] max-w-[600px] gap-4 p-[16px] h-max flex-col border-[#004]/30 border-1 items-center border-solid flex rounded-[23px] bg-[#165D25]/10 self-center">
        <h1 className="text-[28px]  text-left text-[#088738] font-[700]">
          Create New Product
        </h1>{" "}
        <p className="text-base font-[500] text-[#171821]">
          Add new product or service to the market place
        </p>
        <p className="text-[#4F7396] w-full text-left  text-1xl font-[500] leading[24px]">
          Basic Information
        </p>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4  w-full p-4"
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
            <label>Product Description</label>
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

            <label>Cartegory</label>
            {/* Spinner for Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded max-w-[480px] flex flex-col gap-4 text-base text-[#4F7396]"
              required
            >
              <option
                className="width-full flex flex-col gap-4 text-base text-[#4F7396]"
                value=""
              >
                Select Category
              </option>
              {categories.map((cat) => (
                <option
                  className="width-full flex flex-col gap-4 text-base text-[#4F7396]"
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            <label>Product Descrioption</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="border-[#171821]/30 border-[1px] p-2 rounded-[12px]"
              rows={4}
            />
            <button
              type="submit"
              className="bg-[#088738] text-white p-2 rounded-[12px]"
            >
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
