"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Tabs() {
  const tabs = [
    { name: "Market Place", href: "/farms", emoji: "🛒" },
    { name: "Extension Services", href: "/services", emoji: "⛏️" },
    { name: "Finacial Services", href: "/vets", emoji: "💱" },
    { name: "Climate Action", href: "/climateAction", emoji: "☁️" },
  ];
  const [tabsShow, isTabsSHow] = useState(false);
  const pathname = usePathname();
  return (
    <div
      onClick={() => isTabsSHow((prev) => !prev)}
      className=" w-full relative  flex"
    >
      <div className="px-4 py-2  border border-gray-300 ml-2 bg-[#f5f5f5] w-max rounded-lg  self-end flex items-center gap-3 text-base font-semibold  md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#000"
        >
          <path d="M216-144q-29 0-50.5-21.5T144-216v-528q0-29.7 21.5-50.85Q187-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-264H216v264Zm0-336h528v-192H216v192Zm240-72h240v-72H456v72Zm-240 60v-180 180Z" />
        </svg>
        services
      </div>
      {tabsShow && (
        <div className=" z-700  pb-4 flex flex-col bg-{#f5f5f5}  md:flex w-full h-auto  md:w-full md:h-max gap-4  p-[16px] md:pb-0 md:p-1 items-center justify-center">
          <div className="buttons border border-[1px] rounded-lg p-1 border-gray-300 bg-{#f5f5f5} flex flex-col md:flex-row gap-3  ">
            {tabs.map((tabs) => (
              <Link key={tabs.name} href={tabs.href} className="">
                <button
                  className={clsx(
                    " cursor-pointer md:hover:bg-[#fcfcfc] hover:rounded-lg hover:shadow-lg  pl-2 py-2 gap-5 self-center w-[100px] md:w-[160px] md:h-[35px]  h-[35px]  text-[8px] text-[#171821] text-base md:text-[13px]",
                    pathname === tabs.href
                      ? "md:bg-[#fcfcfc] text-gray-700 border border-gray-200 rounded-lg text-center shadow-lg font-semibold text-base "
                      : "font-semibold text-base text-gray-400 text-center"
                  )}
                >
                  <div className="flex gap-1 justify-center">
                    <div className="text-[14px]"> {tabs.emoji}</div>
                    <div> {tabs.name}</div>
                  </div>
                </button>
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <svg
              onClick={() => isTabsSHow((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000"
            >
              <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
