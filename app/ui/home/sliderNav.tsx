"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function SliderNav() {
  const [showSlider, sliderShown] = useState(false);
  const data = [
    {
      id: 1,
      image: "/feed.svg",
      title: "Feed",
      intro: "  Animal feeds Including Layers mash, pigmash etc",
    },
    {
      id: 2,
      image: "/egg.svg",
      title: "Eggs",
      intro: "Eggs including kienyeji and improved Kienyeji",
    },
    {
      id: 3,
      image: "/Chick1.svg",
      title: "Chicks",
      intro: "one day old chicks to 1 month old",
    },
    {
      id: 4,
      image: "/Hen1.svg",
      title: "Poultry",
      intro: "All paultry such as chicken, goose",
    },
    {
      id: 5,
      image: "/Vet.svg",
      title: "Veterinary",
      intro: "vet services ",
    },
  ];
  return (
    <div className="relative">
      <div
        className={`px-4 relative flex md:flex-col md:fixed md:top-0 w-max gap-10 justify-between overflow-y-hidden overflow-scroll ${styles.scrollbarhidden}`}
      >
        {/* <div className="px-4 pointer-events-none absolute left-0  h-full w-40 bg-gradient-to-r from-white via-white/60 to-transparent" />
        <div className="px-4 pointer-events-none absolute right-0 h-full w-40 bg-gradient-to-l from-white/60 via-white/60 to-transparent" /> */}

        <div className="all w-max bg-green-500 mt-4 hidden md:flex rounded-[50px] px-2 items-center  ">
          <span className="md:hidden">LOGO</span>
        </div>
        <div
          onClick={() => sliderShown((prev) => !prev)}
          className="all flex md:hidden w-max bg-green-500 rounded-[50px] px-2 items-center  "
        >
          <span className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#171821"
            >
              <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
            </svg>
          </span>
          <p className="flex w-max font-bold p-2 text-[14px]">
            <span className="hidden md:flex">All</span> Cartegories
          </p>
        </div>
        {data.map(({ id, image, title }) => (
          <span
            className="flex gap-2 text-black items-center hidden md:flex"
            key={id}
          >
            <div className="icon w-[24px] h-[24px]">
              <Image
                src={image}
                alt={title}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="title text-[14px] ">{title}</div>
          </span>
        ))}
      </div>
      {showSlider && (
        <div
          className={`px-4 absolute bg-[#edf2f5] z-1000 top-0 h-[100vh] flex flex-col w-full gap-10 items-center overflow-y-hidden overflow-scroll ${styles.scrollbarhidden}`}
        >
          {/* <div className="px-4 pointer-events-none absolute left-0  h-full w-40 bg-gradient-to-r from-white via-white/60 to-transparent" />
         <div className="px-4 pointer-events-none absolute right-0 h-full w-40 bg-gradient-to-l from-white/60 via-white/60 to-transparent" /> */}

          {data.map(({ id, image, title, intro }) => (
            <span
              className="flex flex-col gap-2 items-start text-black mt-2 w-full items-center md:flex"
              key={id}
            >
              <div className="line w-full border-b border-b-solid items-start border-b-[1px] border-b-[#171821]/20"></div>
              <div className="div flex items-center gap-2 ">
                <div className="icon w-[24px] h-[24px]">
                  <Image
                    src={image}
                    alt={title}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <div className="title text-[14px] ">{title}</div>
                  <div className="title text-[14px] ">{intro}</div>
                </div>
              </div>
            </span>
          ))}
          <div>
            <svg
              onClick={() => sliderShown((prev) => !prev)}
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
