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
    <main className="flex w-full ">
      {" "}
      <div className="w-[14%] border-r border-[#C0B4B4]/50 border-b-[0.3px] z-10000 hidden md:block">
        <SliderNav />
      </div>
      <div
        className={`relative flex gap-2 flex-col mb-0 w-full  ${styles.scrollbarhidden}`}
      >
        <NavBar />
        <div className=" line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        <Tabs />
        <div className=" line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        <div className="relative z-1000 md:hidden topper h-max w-full">
          <div className="sideNav md:hidden">
            <SliderNav />
          </div>
          <div className="mt-5 md:mt-3 line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        </div>
        <main className=" w-full bg-[#f6fafd] px-3 py-6">{children}</main>
      </div>
    </main>
  );
}
