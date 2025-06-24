"use client";
import { useState, useEffect } from "react";
interface DashboardNavProps {
  visible: boolean;
}
export default function Dashboardnav({ visible }: DashboardNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  //const [isopen, setIsClosed] = useState(false);
  // useEffect(() => {
  //   const handleClick = () => {
  //     setIsClosed((prev) => prev);
  //     window.addEventListener("click", handleClick);
  //   };
  // }, []);
  // ${
  //"translate-x-0" : "-translate-x-full"
  //   isopen ?

  if (!visible) return null;
  return (
    <>
      <div
        className={`absolute bg-black/40 w-full md:bg-white md:w-[20%] md:relative 
        }`}
      >
        <div className="div md:relative bg-white  flex gap-6 flex-col max-w-[50%] md:max-w-full  h-[90vh] pt-10 px-6">
          <div className="top flex items-center gap-2 width-full">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z" />
              </svg>
            </div>
            <div className="divtitle w-full">
              <h3>Shamba Link</h3>
              <h3>LTD</h3>
            </div>
          </div>
          <div className="platformdiv flex flex-col gap-5">
            <h4>platform</h4>
            <div className="dashboardelements flex flex-col gap-4">
              <div className="Orders w-full flex flex-col gap-3 ">
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                  >
                    <path d="m670-140 160-100-160-100v200ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z" />
                  </svg>
                  <h4>Orders</h4>
                  <svg
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="ml-10"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                  >
                    <path d="M480-360 280-560h400L480-360Z" />
                  </svg>
                </div>
                <div
                  className={
                    isVisible ? "hidden" : "block orderTypes flex h-max gap-5"
                  }
                >
                  <div className="w-[1px] h-max ml-5 border border-black border-[1px]">
                    {" "}
                  </div>
                  <ul className="flex flex-col gap-5 text-[14px]">
                    <li>pending</li>
                    <li>processing</li>
                    <li>completed</li>
                    <li>cancelled</li>
                  </ul>
                </div>
              </div>
              <div className="Products w-full flex flex-col gap-3">
                <div className="flex gap-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
                  </svg>
                  <h4>Products</h4>
                  <svg
                    onClick={() => setIsSeen((prev) => !prev)}
                    className="ml-9"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                  >
                    <path d="M480-360 280-560h400L480-360Z" />
                  </svg>
                </div>

                <div
                  className={
                    isSeen ? "hidden" : "block productsType flex h-max gap-5"
                  }
                >
                  <div className="w-[1px] h-max ml-5 border border-black border-[1px]">
                    {" "}
                  </div>
                  <ul className=" text-[14px] w-full flex flex-col gap-5">
                    <li>In stock</li>
                    <li>Out of Stock</li>
                  </ul>
                </div>
              </div>
              <div className="Customers">
                <h4>Customers</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
