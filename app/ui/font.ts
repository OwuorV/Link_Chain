import { Josefin_Sans, Lexend_Exa } from "next/font/google";

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});
export const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend-exa",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
