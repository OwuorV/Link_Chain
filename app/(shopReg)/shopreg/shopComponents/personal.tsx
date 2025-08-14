"use client";

type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
};

export default function Personal({ data, update, next }: Props) {
  return (
    <div className="flex flex-col bg-gray-200 border border-[0.5px] border-gray-400 rounded-3xl  ">
      <h2 className="text-xl font-semibold mb-4">
        Personal & Business Details
      </h2>
      <label>Full Name</label>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => update({ fullName: e.target.value })}
      />
      <label>Business Name</label>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Business Name"
        value={data.businessName}
        onChange={(e) => update({ businessName: e.target.value })}
      />
      <label>Business Phone</label>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Business Phone"
        value={data.businessPhone}
        onChange={(e) => update({ businessPhone: e.target.value })}
      />
      <label>Business Email</label>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Business Email"
        value={data.businessEmail}
        onChange={(e) => update({ businessEmail: e.target.value })}
      />

      <button
        onClick={next}
        className="bg-green-600 text-white px-4 py-2 rounded-3xl"
      >
        Next Step
      </button>
    </div>
  );
}
