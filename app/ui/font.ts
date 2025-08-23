import { Lexend_Exa } from "next/font/google";

// Configure Lexend Exa font
export const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend-exa",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Export as default for easy importing
export default lexendExa;
