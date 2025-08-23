import type { NextConfig } from "next";
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: ["192.168.0.105"],
  }),
  // Allow cross-origin requests in development
};

module.exports = nextConfig;
