"use client";

type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
  back: () => void;
};

export default function Location({ data, update, next, back }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Location Details</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Location"
        value={data.location}
        onChange={(e) => update({ location: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Delivery Area"
        value={data.deliveryArea}
        onChange={(e) => update({ deliveryArea: e.target.value })}
      />

      <div className="flex justify-between">
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
