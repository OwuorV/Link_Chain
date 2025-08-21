"use client";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
  back: () => void;
};

export default function StoreDetails({ data, update, next, back }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size must be less than 5MB");
        return;
      }

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
  const handleImageUpload = async (
    file: File,
    type: "storeLogo" | "storeBanner"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await res.json();
    update({ [type]: uploadData.secure_url });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 w-full h-full justify-center items-center">
      <div className=" flex justify-center">
        <div className="flex flex-col items-center gap-3 p-5  w-full backdrop-blur h-max rounded-3xl p-3">
          <h2 className="text-xl font-semibold mb-4">Store Details</h2>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <label>StorName</label>
            <input
              className="border p-2 w-full mb-2 rounded-full"
              placeholder="Store Name"
              value={data.storeName}
              onChange={(e) => update({ storeName: e.target.value })}
            />
          </div>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <label> Description</label>
            <textarea
              className="border p-2 w-full mb-4 rounded-lg"
              placeholder="Store Description"
              value={data.storeDescription}
              onChange={(e) => update({ storeDescription: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="w-full max-w-[480px] w-[200px] flex flex-col gap-3">
              <label className="block mb-2">Upload Store Logo</label>
              <div
                className={`border-1 border-dashed border-[#00ff00]/70 sm:w-[250px] rounded-lg p-2  text-center cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-500" />
                <p className=" font-medium text-gray-400">
                  {"Choose a File or Drag & Drop"}
                </p>

                <input
                  className="text-green-600 font-small text-center"
                  type="file"
                  onChange={(e) =>
                    e.target.files &&
                    handleImageUpload(e.target.files[0], "storeLogo")
                  }
                />
              </div>
            </div>
            {data.storeLogo && (
              <img src={data.storeLogo} alt="Logo" className="w-20 h-20 mt-2" />
            )}
            <div className="w-full max-w-[480px] flex flex-col gap-3">
              <label className="block mb-2">Upload Store Banner</label>

              <div
                className={`border-1 border-dashed border-[#00ff00]/70 sm:w-[250px] rounded-lg p-2  text-center cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <CloudArrowUpIcon className="mx-auto h-12 w-max text-gray-500" />
                <p className=" font-medium text-gray-400">
                  {"Choose a File or Drag & Drop"}
                </p>

                <input
                  className="text-green-600 font-semibold"
                  type="file"
                  onChange={(e) =>
                    e.target.files &&
                    handleImageUpload(e.target.files[0], "storeBanner")
                  }
                />
              </div>
            </div>
            <div className="w-full">
              {previewUrl && (
                <div className="w-full h-60 flex self-center rounded-lg">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {data.storeBanner && (
              <img
                src={data.storeBanner}
                alt="Banner"
                className="w-full h-24 mt-2 object-cover"
              />
            )}
          </div>

          <div className="w-full  max-w-[480px] flex  justify-between">
            <button
              onClick={back}
              className="bg-gray-800 rounded-full text-white px-4 py-2 rounded"
            >
              Back
            </button>

            <button
              onClick={next}
              className="bg-green-600 rounded-full text-white px-4 py-2 rounded"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>

      <div className="info p-5 m-4 bg-white grid grid-cols-1">
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-400 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            ✅
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Personal & Business Details</p>
            <p className="text-gray-600">Tell us about Your Business</p>
          </div>
        </div>
        <div className="h-[40px] border-l w-[40px]  border-l-green-600 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-400 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            ✅
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Location Details</p>
            <p className="text-gray-600">Shop location and delivery Location</p>
          </div>
        </div>
        <div className="h-[40px] w-[40px] border-l border-l-green-600 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-600 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            3
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Store Details</p>
            <p className="text-gray-500">About your Store</p>
          </div>
        </div>
        <div className="h-[40px] w-[40px] border-l border-l-gray-300 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-gray-200 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            4
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">PAyment Details</p>
            <p className="text-gray-400">
              Give your details to Receive Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function setIsDragging(arg0: boolean) {
  throw new Error("Function not implemented.");
}
