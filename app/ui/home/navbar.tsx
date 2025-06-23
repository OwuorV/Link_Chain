"use client";
import Search from "@/app/ui/home/searchpane";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="w-full overflow-hidden fixed top-0 z-20 bg-white pr-8 pt-1">
        <ul className="flex justify-between gap-10 items-center">
          <div className="text-[#0f0] text-[26px] tracking-widest font-bold">
            Link.
          </div>
          <li>
            <span className="hidden md:flex border border-solid-[1px] rounded-[29px] gap-2 px-4 py-2 h-10 items-center">
              <GlobeAltIcon className="w-6 h-6 text-gray-600" />
              <span>Language</span>
            </span>
          </li>
          <Search />
          <span className="flex gap-10 items-center ">
            <Link href="/farms" className=" hidden md:flex">
              Buy
            </Link>
            <Link href="/services" className=" hidden md:flex">
              sell
            </Link>
            <Link href="/vets" className=" hidden md:flex">
              Cart
            </Link>
            <Link href="/farms">
              <span className="flex md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000"
                >
                  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                </svg>
              </span>
            </Link>
            <Link href="/Dashboard">
              <div className="bg-green-300 rounded-[20px] w-[40px] overflow-hidden h-[40px]">
                <Image
                  src={"/me.png"}
                  alt={"Avator"}
                  objectFit="cover"
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          </span>
        </ul>
      </nav>
    </>
  );
}
