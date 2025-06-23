"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export default function Tabs() {
  const tabs = [
    { name: "Market Place", href: "/farms" },
    { name: "Extension Services", href: "/services" },
    { name: "Finacial Services", href: "/vets" },
  ];
  const pathname = usePathname();
  return (
    <>
      <div className="flex w-full h-auto md:w-full md:h-[60px]  p-[16px] items-center justify-center">
        <div className="buttons gap-3 flex ">
          {tabs.map((tabs) => (
            <Link key={tabs.name} href={tabs.href} className="">
              <button
                className={clsx(
                  " cursor-pointer hover:bg-[#165D25] rounded-[12px] px-5 py-2 gap-5 self-center flex items-center justify-center w-[100px] md:w-[160px] md:h-[35px]  h-[35px]  text-[8px] text-white font-bold md:text-[13px]",
                  pathname === tabs.href ? "bg-[#00ff00] " : "bg-[#6C7A6F]"
                )}
              >
                {tabs.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
