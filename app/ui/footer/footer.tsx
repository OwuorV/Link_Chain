"use client";
import { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-green-500 mx-2 fixed bottom-2 rounded-lg">
      <div className="logo">
        <Image src="/DAH.jpg" alt="Logo" width={70} height={30} />{" "}
      </div>
      <div>
        <p className="text-white">
          Helping local Farmers meet Externsion Service Providers and Financial
          services
        </p>
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
      <div>
        <p>Be on the Know</p>
        <p>subscribe to our newsletter for updates</p>
      </div>
    </div>
  );
}
