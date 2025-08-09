"use client";

type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
  back: () => void;
};

export default function StoreDetails({ data, update, next, back }: Props) {
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Details</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Store Name"
        value={data.storeName}
        onChange={(e) => update({ storeName: e.target.value })}
      />
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Store Description"
        value={data.storeDescription}
        onChange={(e) => update({ storeDescription: e.target.value })}
      />

      <label className="block mb-2">Upload Store Logo</label>
      <input
        type="file"
        onChange={(e) =>
          e.target.files && handleImageUpload(e.target.files[0], "storeLogo")
        }
      />

      {data.storeLogo && (
        <img src={data.storeLogo} alt="Logo" className="w-20 h-20 mt-2" />
      )}

      <label className="block mt-4 mb-2">Upload Store Banner</label>
      <input
        type="file"
        onChange={(e) =>
          e.target.files && handleImageUpload(e.target.files[0], "storeBanner")
        }
      />

      {data.storeBanner && (
        <img
          src={data.storeBanner}
          alt="Banner"
          className="w-full h-24 mt-2 object-cover"
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={back}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={next}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
