import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function Home() {
  return <div className={`w-full ${styles.scrollbarhidden}`}></div>;
}
