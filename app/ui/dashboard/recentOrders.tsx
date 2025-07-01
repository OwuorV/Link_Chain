import React from "react";

const statuses = ["pending", "processing", "completed", "cancelled"];

export default function RecentOrders() {
  return (
    <div className="bg-[#A9DFD8]/20 p-6 rounded-[12px] mb-6 w-full shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <div className="grid grid-cols-4 gap-2 md:flex w-max mb-4 bg-[#DDF4D5] rounded-[12px] w-full p-1">
        {statuses.map((status) => (
          <button
            key={status}
            className="px-1 md:px-4 cursor-pointer py-1 rounded-full bg-white text-[11px] md:text-base text-black font-medium capitalize hover:bg-green-200 transition"
          >
            {status}
          </button>
        ))}
      </div>
      <div className="div flex gap-3 md:flex-col">
        <div className="w-max md:w-full grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-5 text-sm font-semibold text-gray-700">
          <span>Order ID :</span>
          <span>Customer :</span>
          <span>Status :</span>
          <span>Action :</span>
          <span>Total :</span>
        </div>
        {/* No orders display */}
        <div className="text-center w-full flex justify-center items-center text-gray-400 mt-4">
          No recent orders
        </div>
      </div>
    </div>
  );
}
