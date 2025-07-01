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
      <div className="w-[14%] z-10000 hidden md:block">
        <SliderNav />
      </div>
      <div
        className={`relative flex gap-1 flex-col mb-0 w-full bg-[#edf2f5] ${styles.scrollbarhidden}`}
      >
        <div className="fixed flex flex-col gap-2 bg-[#edf2f5] z-1000 topper h-max w-full">
          <NavBar />
          <div className="mt-5 md:mt-7 line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
          <div className="sideNav md:hidden">
            <SliderNav />
          </div>
          <div className="mt-5 md:mt-7 line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
          <Tabs />
        </div>

        <main className=" w-full bg-[#f6fafd] px-3 pt-40 md:pt-45 ">
          {children}
        </main>
      </div>
    </main>
  );
}
