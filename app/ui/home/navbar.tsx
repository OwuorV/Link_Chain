"use client";
import Search from "@/app/ui/home/searchpane";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, isNavSeen] = useState(false);
  const [newNav, isNewNav] = useState(false);

  return (
    <>
      {open && (
        <div className="cover bg-[#171821]/90 backdrop-blur fixed right-0 z-600 w-full md:w-0 h-[100vh]">
          <div className="px-4 fixed top-1 right-0 z-600 md:top-13 right-2 w-64 rounded-lg shadow-lg bg-[#edf2f5] ring-1 ring-black/10 z-10 border border-[#000]/10">
            <div className="px-4 py-3">
              <p className="text-[16px] font-semibold text-gray-900">Tarus</p>
              <p className="text-[14px] text-gray-500">
                gravincekowuor1l@gmail.com
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-400 uppercase">
              Account
            </div>
            <ul className="px-4 space-y-1 text-sm text-gray-700">
              <li>
                <a href="/Dashboard" className="block hover:text-green-600">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-green-600">
                  Order History
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-green-600">
                  Settings
                </a>
              </li>
            </ul>
            <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-400 uppercase">
              Content
            </div>
            <ul className="px-4 space-y-1 text-sm text-gray-700">
              <li>
                <a href="#" className="block hover:text-green-600">
                  Saved Items
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-green-600">
                  Blog
                </a>
              </li>
            </ul>
            <div className="border-t border-gray-200 px-4 py-3">
              <button className="text-sm text-red-600 hover:text-red-700 w-full text-left">
                Logout
              </button>
            </div>
            <div className="div flex justify-center w-full">
              <svg
                onClick={() => setOpen((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 -960 960 960"
                width="34px"
                fill="#000"
              >
                <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          showNav
            ? "flex justify-end top-0  backdrop-blur bg-[#171821]/70 w-full z-900"
            : "hidden"
        }
      >
        <div className="bg-[#edf2f5] flex flex-col w-[50%] right-0 h-[100vh]">
          {" "}
          <span className="flex self-end w-full justify-end mt-4 mr-2 gap-15">
            Menu
            <svg
              onClick={() => isNavSeen((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
              className="border rounded-[10px] border-[#f00]"
            >
              <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
            </svg>
          </span>
          <ul className="flex flex-col w-[90%] gap-7 pt-6 pl-12  ">
            <li className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000"
              >
                <path d="M192-144q-20 0-34-14t-14-34v-74l144-124v246h-96Zm144 0v-144h288v144H336Zm336 0v-309L517-586l110-95 172 147q8 7 12.5 16.58 4.5 9.59 4.5 20.42v305q0 20-14 34t-34 14h-96ZM144-330v-167q0-10.54 4.5-20.27T161-534l288-246q7-6 14.81-9 7.82-3 16-3 8.19 0 16.19 3 8 3 15 8l79 68-446 383Z" />
              </svg>
              Home
            </li>
            <li onClick={() => isNavSeen((prev) => !prev)} className="pl-5">
              <Link href="/farms" className="">
                Buy
              </Link>
            </li>
            <li onClick={() => isNavSeen((prev) => !prev)} className="pl-5">
              <Link href="/Dashboard" className="">
                Sell
              </Link>
            </li>
            <div className="w-full gap-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000"
              >
                <path d="M263.79-96Q234-96 213-117.21t-21-51Q192-198 213.21-219t51-21Q294-240 315-218.79t21 51Q336-138 314.79-117t-51 21Zm432 0Q666-96 645-117.21t-21-51Q624-198 645.21-219t51-21Q726-240 747-218.79t21 51Q768-138 746.79-117t-51 21ZM253-696l83 192h301l82-192H253Zm-31-72h570q14 0 20.5 11t1.5 23L702.63-476.14Q694-456 676.5-444T637-432H317l-42 72h493v72H276q-43 0-63.5-36.15-20.5-36.16.5-71.85l52-90-131-306H48v-72h133l41 96Zm114 264h301-301Z" />
              </svg>
              Cart
            </div>
          </ul>
          <div className="quiclinks1">
            <div className="border border-t-[1px] border-[#000]/10 mt-1"></div>
            <div className="quicklinks flex flex-col w-full items-center gap-3 text-sm mt-6 px-6">
              Quicklinks
              <ul className="w-full flex flex-col items-start gap-3">
                <li className="flex gap-2 justify-between w-full">
                  {" "}
                  About us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000"
                  >
                    <path d="M384-288v-384l192 192-192 192Z" />
                  </svg>
                </li>
                <li className="flex gap-2 justify-between w-full">
                  {" "}
                  View Market{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000"
                  >
                    <path d="M384-288v-384l192 192-192 192Z" />
                  </svg>
                </li>
                <li className="flex gap-2 justify-between w-full">
                  {" "}
                  Service Providers{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000"
                  >
                    <path d="M384-288v-384l192 192-192 192Z" />
                  </svg>
                </li>
                <li className="flex gap-2 justify-between w-full">
                  {" "}
                  finacial Provicers{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000"
                  >
                    <path d="M384-288v-384l192 192-192 192Z" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="border border-t-[1px] border-[#000]/10 mt-6"></div>
          </div>
        </div>
      </div>
      <nav className="flex w-full justify-center overflow-hidden top-0 z-20 bg-transparent px-12 pt-1">
        <ul className="flex justify-between gap-3 w-[80%] items-center">
          <li>
            <span className="hidden md:flex border border-solid-[1px] rounded-[29px] gap-2 px-4 py-2 h-10 items-center">
              <GlobeAltIcon className="w-6 h-6 text-gray-600" />
              <span>Language</span>
            </span>
          </li>
          <Search />
          <span className="flex gap-6 items-center ">
            <Link href="/farms" className=" hidden md:flex">
              Buy
            </Link>
            <Link href="/services" className=" hidden md:flex">
              sell
            </Link>
            <Link href="/vets" className=" hidden md:flex">
              Cart
            </Link>
            <div>
              <span
                onClick={() => isNavSeen((prev) => !prev)}
                className="flex gap-3 md:hidden  rounded-[12px] border p-1 px-[4px] border-[1px] border-[#000]/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000"
                >
                  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                </svg>
                Menu
              </span>
            </div>
            {/* href="/Dashboard" */}

            <div
              onClick={() => setOpen((prev) => !prev)}
              className="bg-green-300 rounded-[20px] w-[40px] overflow-hidden h-[40px]"
            >
              <Image
                src={"/me.png"}
                alt={"Avator"}
                objectFit="cover"
                width={40}
                height={40}
              />
            </div>
          </span>
        </ul>
      </nav>
    </>
  );
}
