"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: "Weather", href: "/climateAction/weather" },
    { name: "blog", href: "/climateAction/blog" },
  ];
  return (
    <div className="w-full flex-col justify-center items-center self-center flex h-full bg-[#99b6d8] md:px-30 pt-8">
      <div className="flex justify-left items-center text-[28px] font-bold text-[#165D25] mb-5">
        Welcome to Climate Action
      </div>
      <div className="flex justify-start items-start text-start text-[16px] font-base text-gray-100 mb-5">
        Stay informed about the weather and climate action initiatives and their
        impact on our planet.
      </div>
      <div className="buttons border-b border-b-[1px] border-b-[#171821]/20 flex flex justify-center md:flex-row gap-3  ">
        {tabs.map((tab: { name: string; href: string }) => (
          <Link key={tab.name} href={tab.href} className="">
            <button
              className={clsx(
                " cursor-pointer md:hover:bg-[#fff]  pl-2 py-2 gap-5 self-center text-left w-[100px] md:w-[160px] md:h-max  h-max  text-[14px] text-[#171821] font-base md:text-[14px] md:font-semibold",
                pathname === tab.href
                  ? "md:bg-[#fff] text-[#171821] border-b border-b-[#fff] border-b-solid border-b-[2px] text-[16px] font-semibold"
                  : "md:bg-[#99b6d8]"
              )}
            >
              {tab.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="p-4 w-full h-full mx-auto">{children}</div>
    </div>
  );
}
