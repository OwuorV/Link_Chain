"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Tabs() {
  const tabs = [
    { name: "Market Place", href: "/farms" },
    { name: "Extension Services", href: "/services" },
    { name: "Finacial Services", href: "/vets" },
    { name: "Climate Action", href: "/climateAction" },
  ];
  const [tabsShow, isTabsSHow] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative w-[80%]">
      <div
        onClick={() => isTabsSHow((prev) => !prev)}
        className="px-4 relative  right-0 justify-end flex items-center gap-3 text-base font-medium div"
      >
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
        <div className=" z-700 bg-[#edf2f5] pb-4 flex flex-col md:flex w-full h-auto md:mb-[-8px] md:w-full md:h-[60px] gap-4  p-[16px] pb-0 items-center justify-center">
          <div className="buttons flex flex-col md:flex-row gap-3  ">
            {tabs.map((tabs) => (
              <Link key={tabs.name} href={tabs.href} className="">
                <button
                  className={clsx(
                    "trapezium cursor-pointer md:hover:bg-[#cadeed]  pl-2 py-2 gap-5 self-center text-left w-[100px] md:w-[160px] md:h-[35px]  h-[35px]  text-[8px] text-[#171821] font-base md:text-[13px]",
                    pathname === tabs.href
                      ? "md:bg-[#f6fafd] text-[#171821]"
                      : "md:bg-[#edf2f5]"
                  )}
                >
                  {tabs.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
