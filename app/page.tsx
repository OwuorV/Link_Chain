import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
import NavBar from "./ui/home/navbar";
export default function Home() {
  return (
    <div className={`w-full ${styles.scrollbarhidden}`}>
      <NavBar />
    </div>
  );
}
