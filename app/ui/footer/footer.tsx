"use client";
import { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-green-500 md:mx-2  mb-3 w-full rounded-lg md:p-16 p-4">
      <div className="logo flex flex-col items-center gap-2 ">
        <Image src="/DAH.jpg" alt="Logo" width={70} height={30} />{" "}
        <p className="text-white text-center md:text-start">
          Helping local Farmers meet Externsion Service Providers and Financial
          services
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <div>
          <ul>
            <li> email</li>
            <li> business email</li>
            <li> location</li>
            <li> phone number</li>
          </ul>
        </div>
        <div>
          Quick Links
          <ul>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
            <li>Farmers</li>
            <li>Financial Services</li>
            <li>Blog posts</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 ">
          <p>Be on the Know</p>
          <p>subscribe to our newsletter for updates</p>
          <div>
            <form action="submit" className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                name="email"
                placeholder="tarussurat@gmail.com"
                // onChange={handleChange}
                className="border outline-none md:min-w-[400px] focus:border-gray-700 focus:ring-[0.5] focus:ring-grey-800 p-2 w-full mt-3 hover:shadow-md hover:border-gray-800 bg-white rounded-lg px-4 border border-gray-800"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
