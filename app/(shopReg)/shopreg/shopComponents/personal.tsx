"use client";

type Props = {
  data: any;
  update: (newData: any) => void;
  next: () => void;
};

export default function Personal({ data, update, next }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 w-full h-full justify-center items-center">
      <div className=" flex justify-center">
        <div className="flex flex-col items-center gap-3 p-5  w-full backdrop-blur h-max rounded-3xl p-3">
          <h2 className="text-xl font-semibold mb-4">
            Personal & Business Details
          </h2>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <label>Full Name</label>
            <input
              className="border p-2 w-full mb-2 rounded-full max-w-[480px]"
              placeholder="Full Name"
              value={data.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
            />
          </div>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <label>Business Name</label>
            <input
              className="border p-2 w-full mb-2  rounded-full max-w-[480px]"
              placeholder="Business Name"
              value={data.businessName}
              onChange={(e) => update({ businessName: e.target.value })}
            />
          </div>

          <div className="w-full max-w-[480px] flex flex-col gap-3">
            {" "}
            <label>Business Phone</label>
            <input
              className="border p-2 w-full mb-2  rounded-full max-w-[480px]"
              placeholder="Business Phone"
              value={data.businessPhone}
              onChange={(e) => update({ businessPhone: e.target.value })}
            />
          </div>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <label>Business Email</label>
            <input
              className="border p-2 w-full mb-4  rounded-full max-w-full"
              placeholder="Business Email"
              value={data.businessEmail}
              onChange={(e) => update({ businessEmail: e.target.value })}
            />
          </div>
          <div className="w-full max-w-[480px] flex flex-col gap-3">
            <button
              onClick={next}
              className="bg-green-600 text-white px-4 py-2 w-max rounded-3xl self-end"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>

      <div className="info p-5 m-4 bg-white grid grid-cols-1">
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-green-600 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            1
          </div>
          <div className="flex flex-col">
            <p className="text-green-600">Personal & Business Details</p>
            <p className="text-gray-600">Tell us about Your Business</p>
          </div>
        </div>
        <div className="h-[40px] border-l w-[40px]  border-l-gray-300 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-gray-200 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            2
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Location Details</p>
            <p className="text-gray-400">Shop location and delivery Location</p>
          </div>
        </div>
        <div className="h-[40px] w-[40px] border-l border-l-gray-300 ml-4 border-l-[1px]"></div>
        <div className="w-full max-w-[480px] flex gap-2 ">
          <div className="bg-gray-200 rounded-full w-[30px] h-[30px] text-lg text-center  text-white">
            3
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Store Details</p>
            <p className="text-gray-400">About your Store</p>
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
