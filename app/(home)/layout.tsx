import NavBar from "@/app/ui/home/navbar";
import SliderNav from "@/app/ui/home/sliderNav";
import Tabs from "@/app/ui/home/tabs";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`flex gap-1 flex-col w-full ${styles.scrollbarhidden}`}>
        <NavBar />
        <div className="mt-5 md:mt-7 line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        <SliderNav />
        <div className="line h-[2px] w-full border-b-[0.3px] border-[#C0B4B4]/50 "></div>
        <Tabs />
        <main className="flex-1 p-4 w-full">{children}</main>
      </div>
    </>
  );
}
