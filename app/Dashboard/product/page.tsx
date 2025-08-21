"use client";
import { useState, useRef, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const categories = [
  "Poultry",
  "Cereals",
  "Crops",
  "Vegetables",
  "Fruits",
  "Livestock",
  "Dairy",
  "Herbs & Spices",
  "Seeds & Seedlings",
  "Fish",
  "Honey & Beekeeping",
] as const;

interface CustomSelectProps {
  options: readonly string[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}

function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
  invalid,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`border rounded-lg px-4 py-2 flex mt-4 text-gray-200 items-center justify-between cursor-pointer hover:border-green-500 ${
          invalid ? "border-red-500" : "border-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
      >
        <span className={value ? "text-gray-600" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown size={20} />
      </div>
      {isOpen && (
        <ul className="absolute w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-md z-10 overflow-y-auto max-h-48">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-green-100 m-1 rounded-lg cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProductForm() {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    category: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoryInvalid, setCategoryInvalid] = useState(false);

  // Revoke preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 3 * 1024 * 1024) {
        // 3MB limit
        toast.error("Image size must be less than 3MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 3 * 1024 * 1024) {
        // 3MB limit
        toast.error("Image size must be less than 3MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateAll = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (
      !formData.price ||
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      toast.error("Valid price is required");
      return false;
    }
    if (!formData.category.trim()) {
      setCategoryInvalid(true);
      toast.error("Please select a category");
      return false;
    }
    setCategoryInvalid(false);
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    // Create FormData but note about image upload being temporarily disabled
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description.trim());

    // Note: Image upload is temporarily disabled due to server time sync issues
    // The API will create products without images for now
    if (formData.image) {
      console.log(
        "Image selected but upload temporarily disabled:",
        formData.image.name
      );
      // Still append the image in case the API is fixed
      data.append("image", formData.image, formData.image.name);
    }

    // Debug FormData entries
    console.log("Submitting product data:");
    for (const pair of data.entries()) {
      if (pair[0] === "image" && pair[1] instanceof File) {
        console.log(pair[0], pair[1].name, pair[1].size);
      } else {
        console.log(pair[0], pair[1]);
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }

        console.error("Server error response:", res.status, errorData);
        const message =
          errorData.error ||
          errorData.message ||
          `Request failed with status ${res.status}`;
        toast.error(message);
        return;
      }

      const result = await res.json();
      console.log("Product creation response:", result);

      // Show success message and any warnings
      if (result.warning) {
        toast.success(`${result.message}\n⚠️ ${result.note || result.warning}`);
      } else {
        toast.success(result.message || "Product created successfully!");
      }

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });
      setPreviewUrl(null);
      setCategoryInvalid(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Network or unexpected error:", error);
      toast.error("Network error - please check your connection and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex p-6 space-y-4 justify-center">
      <div className="flex flex-col items-center gap-5 p-4 border max-w-[95%]  border-gray-300 bg-gray-200 rounded-[20px] md:w-[60%]">
        <div className="flex items-center self-start w-full gap-5 mb-4">
          <span>back</span>
          <span>
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Product
            </h2>
            <p className="text-gray-500">
              Add new agricultural product to the marketplace
            </p>
            {/* Temporary notice about image uploads */}
            <p className="text-orange-600 text-sm mt-1">
              ⚠️ Note: Image uploads are temporarily disabled due to server
              maintenance
            </p>
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center justify-center w-full"
        >
          <div className="text-[20px]">Product Info</div>

          <div className="w-full flex flex-col">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border outline-none focus:border-green-500 focus:ring-[0.5] focus:ring-green-400 p-2 w-full mt-3 hover:shadow-md hover:border-green-500 rounded-lg px-4 border border-gray-400"
              required
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="price">Price (KSH)</label>
            <input
              type="number"
              name="price"
              placeholder="Price in KSH"
              value={formData.price}
              onChange={handleChange}
              className="border outline-none focus:border-green-500 focus:ring-[0.5] focus:ring-green-400 p-2 w-full mt-3 hover:shadow-md hover:border-green-500 rounded-lg px-4 border border-gray-400"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="category">Category</label>
            <CustomSelect
              options={categories}
              placeholder="Select Category"
              value={formData.category}
              onChange={(value) => {
                setFormData((p) => ({ ...p, category: value }));
                setCategoryInvalid(false); // Clear error when user selects
              }}
              invalid={categoryInvalid}
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="description">Product Description</label>
            <textarea
              name="description"
              placeholder="Describe your product, including quality, origin, and any special features..."
              value={formData.description}
              onChange={handleChange}
              className="border focus:outline-none focus:border-green-500 focus:ring-[0.5] focus:ring-green-400 p-2 w-full mt-3 min-h-30 rounded-lg"
              required
              rows={4}
            />
          </div>

          {/* Keep image upload UI but add disabled state notice */}
          <div className="w-full flex flex-col">
            <label className="flex items-center gap-2">
              <span>Product Image</span>
              <span className="text-sm text-orange-600">
                (Temporarily disabled)
              </span>
            </label>
            <div
              className={`border-1 border-dashed w-full rounded-lg p-6 text-center cursor-not-allowed opacity-50 ${
                isDragging ? "border-green-500 bg-green-50" : "border-gray-500"
              }`}
              title="Image uploads temporarily disabled due to server maintenance"
            >
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-500" />
              <p className="mt-2 font-medium text-gray-400">
                {formData.image
                  ? `${formData.image.name} (Upload disabled)`
                  : "Image uploads temporarily disabled"}
              </p>
              <p className="text-sm text-gray-500">
                Images will be enabled once server issues are resolved
              </p>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                disabled
              />
            </div>

            {previewUrl && (
              <div className="w-full h-60 flex self-center rounded-lg mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full rounded-lg object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded">
                    Upload Disabled
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 cursor-pointer text-white px-4 py-2 w-full rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Product... please wait" : "Create Product"}
          </button>
          <p className="text-sm text-gray-500">
            By creating a product, you agree to our{" "}
            <a
              href="/terms"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
