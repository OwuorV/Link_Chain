import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function Dashboard() {
  return <div className={`chieth w-full ${styles.scrollbarhidden}`}></div>;
}
