"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import josefinSans from "../ui/font";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: "Weather", href: "/climateAction/weather" },
    { name: "blog", href: "/climateAction/blog" },
  ];
  return (
    <div
      className={`${josefinSans.variable} w-full flex-col justify-center items-center self-center px-5 flex h-full bg-[#99b6d8] md:px-30 pt-8`}
    >
      <div
        className={`flex justify-left items-center text-center text-[28px] font-bold text-[#165D25] mb-5 `}
      >
        Welcome to Climate Action
      </div>
      <div
        className={`flex justify-start text-center text-[16px] font-base text-gray-100 mb-5 ${josefinSans.className}`}
      >
        Stay informed about the weather and climate action initiatives and their
        impact on our planet.
      </div>
      <div className="buttons grid grid-cols-2 px-4 py-1 border w-full mx-5 md:mx-1 md:w-max bg-[#9ab6d8]/70 gap-5 border-[0.5px] border-gray-300 rounded-lg   ">
        {tabs.map((tab: { name: string; href: string }) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="cursor-pointer hover:bg-[#99c6d8]  px-4 py-1  self-center text-center w-max  h-max  text-base text-[#171821] font-medium md:text-base md:font-semibold"
          >
            <button
              className={clsx(
                "cursor-pointer hover:bg-[#99c6d8]  px-4 py-1  self-center text-center w-max  h-max  text-base text-[#171821] font-medium md:text-base md:font-semibold",
                pathname === tab.href
                  ? "bg-w-full bg-[#99c6d8] text-white text-[16px] w-1/2 font-semibold rounded-lg"
                  : "cursor-pointer hover:bg-[#99c6d8] w-1/2 px-4 py-1 gap-5 self-center text-center w-max  h-max  text-[14px] text-[#171821] font-medium md:text-[14px] md:font-semibold"
              )}
            >
              {tab.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="p-4 w-full h-screen overflow-y-scroll mx-auto">
        {children}
      </div>
    </div>
  );
}
