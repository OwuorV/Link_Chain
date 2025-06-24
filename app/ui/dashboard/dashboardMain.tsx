"use client";
import React from "react";
import Dashboardnav from "./dashboardnav";
import MainLayout from "@/app/Dashboard/allDashboard/page";
interface DashboardnavProps {
  toggle: () => void;
  children: React.ReactNode;
}
export default function DashboardMain({ toggle, children }: DashboardnavProps) {
  return (
    <main className="bg-[#F1FAF5] border-[#C0B4B4]/60 border-[1px] border-solid rounded-[30px] w-full h-max py-2">
      <div className="px-3 line w-full h-max border-b border-b-solid border-b-[1px] border-b-[#C0B4B4]/60 py-4 mt-5 flex gap-4">
        <div className="drawer">
          <svg
            onClick={toggle}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#00000088"
            z={1000}
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm280-80h280v-560H480v560Z" />
          </svg>
        </div>{" "}
        overview
      </div>
      {children}
    </main>
  );
}
