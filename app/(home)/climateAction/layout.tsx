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
    <div className="w-full">
      <div className="flex justify-center bg-[#edf2f5] items-center text-[28px] font-bold text-[#0f0] mb-5">
        Welcome to Climate Action
      </div>
      <div className="buttons flex flex-col justify-center md:flex-row gap-3  ">
        {tabs.map((tab: { name: string; href: string }) => (
          <Link key={tab.name} href={tab.href} className="">
            <button
              className={clsx(
                " cursor-pointer md:hover:bg-[#cadeed]  pl-2 py-2 gap-5 self-center text-left w-[100px] md:w-[160px] md:h-[35px]  h-[35px]  text-[8px] text-[#171821] font-base md:text-[13px]",
                pathname === tab.href
                  ? "md:bg-[#f6fafd] text-[#171821]"
                  : "md:bg-[#edf2f5]"
              )}
            >
              {tab.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="p-4 max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
