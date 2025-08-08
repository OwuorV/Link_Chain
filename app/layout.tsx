"use client";

import Image from "next/image";

import React from "react";

import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import styles from "@/app/ui/scrollbarHide.module.css";
import NavBar from "@/app/ui/home/navbar";
import { useState } from "react";
const public_sans = Public_Sans({
  subsets: ["latin"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showcoming, setShowComing] = useState(false);
  return (
    <html lang="en">
      <body
        className={`w-full ${public_sans} antialiased overflow-scroll h-full ${styles.scrollbarhidden}`}
      >
        <>
          {showcoming && (
            <div className="fixed z-1000 flex flex-col justify-center items-center rounded-lg w-full h-full border  bg-[#000]/60 backdrop-blur text-center py-2">
              {" "}
              <div className="overflow-hidden w-full md:w-[500px] h-[300px]">
                <Image
                  src="/voice_access_desktop.png"
                  alt="voice access coming soon"
                  width={500}
                  height={300}
                  className=" object-cover rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Voice Access Coming Soon!
              </h1>
              <button
                onClick={() => setShowComing((prev) => !prev)}
                className=" cursor-pointer text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#fff] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34px"
                  viewBox="0 -960 960 960"
                  width="34px"
                  fill="#fff"
                  className="hover:fill-[#000] transition-colors duration-200"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          )}
          <div
            onClick={() => setShowComing((prev) => !prev)}
            className="text-sm fixed bottom-10 z-10000 cursor-pointer bg-[#171821] rounded-[50px] p-[10px] hover:scale-110 transition-transform duration-200 right-10 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="#fff"
              className=""
            >
              <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM680-80v-200H480q-33 0-56.5-23.5T400-360v-240q0-33 23.5-56.5T480-680q24 0 41.5 10.5T559-636q55 66 99.5 90.5T760-520v80q-53 0-107-23t-93-55v138h120q33 0 56.5 23.5T760-300v220h-80Zm-280 0q-83 0-141.5-58.5T200-280q0-72 45.5-127T360-476v82q-35 14-57.5 44.5T280-280q0 50 35 85t85 35q39 0 69.5-22.5T514-240h82q-14 69-69 114.5T400-80Z" />
            </svg>
          </div>
          <main className="w-full h-full justify-center items-center flex">
            {children}
          </main>
        </>
      </body>
    </html>
  );
}
