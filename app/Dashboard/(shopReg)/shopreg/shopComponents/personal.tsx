"use client";

type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
};

export default function Personal({ data, update, next }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Personal & Business Details
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => update({ fullName: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Business Name"
        value={data.businessName}
        onChange={(e) => update({ businessName: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Business Phone"
        value={data.businessPhone}
        onChange={(e) => update({ businessPhone: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Business Email"
        value={data.businessEmail}
        onChange={(e) => update({ businessEmail: e.target.value })}
      />

      <button
        onClick={next}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Next Step
      </button>
    </div>
  );
}
