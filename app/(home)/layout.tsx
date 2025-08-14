import NavbarWrapper from "@/app/ui/home/navbarwrapper";
import SliderNav from "@/app/ui/home/sliderNav";
import Tabs from "@/app/ui/home/tabs";
import Footer from "../ui/footer/footer";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-3  relative w-full ">
      {" "}
      <div className=" hidden border-r border-[#C0B4B4]/50 border-b-[0.3px] z-10000 hidden">
        <SliderNav />
      </div>
      <div
        className={`relative flex gap-2 flex-col mb-0 w-full  ${styles.scrollbarhidden}`}
      >
        <NavbarWrapper />
        <div className=" line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        <Tabs />
        <div className=" line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        <div className="relative z-1000 md:hidden topper h-max w-full">
          <div className="sideNav md:hidden">
            <SliderNav />
          </div>
          <div className="mt-5 md:mt-3 line h-[10px] w-full border-b-[0.3px] border-[#C0B4B4]/50"></div>
        </div>
        <main className=" w-full px-auto gap-3 relative flex flex-col bg-[#f6fafd] md:px-30 py-6">
          <div>{children}</div>
        </main>
        <div className="w-full flex justify-center p-8 items-center">
          <Footer />
        </div>
      </div>
    </main>
  );
}
