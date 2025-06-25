import React from "react";
import { Package, BarChart2, Settings, Users } from "lucide-react";
import Link from "next/link";
const actions = [
  {
    label: "Add Product",
    ref: "/Dashboard/product",
    icon: <Package size={18} />,
    className: "",
  },
  { label: "View Analytics", icon: <BarChart2 size={18} />, className: "" },
  {
    label: "Change Settings",
    icon: <Settings size={18} />,
    className: "capitalize",
  },
  { label: "Customer Support", icon: <Users size={18} />, className: "" },
];

export default function QuickActions() {
  return (
    <div className="bg-[#A9DFD8]/20 p-6 rounded-[12px] w-full shadow-sm ">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {actions.map(({ label, icon, className, ref }) => (
          <button
            key={label}
            className={`flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition ${className}`}
          >
            <a href={ref}>
              {icon}
              {label}
            </a>
          </button>
        ))}
      </div>
    </div>
  );
}
