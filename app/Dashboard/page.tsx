import Card from "@/app/ui/dashboard/idashboardIcons/icon";
import { TbBusinessplan } from "react-icons/tb";
import VisitorChart from "../ui/dashboard/monthlychat";
import EarningsCard from "../ui/dashboard/gaugechart";
import TopProducts from "../ui/dashboard/topProducts";

export default function MainLayout() {
  return (
    <div className="flex flex-col gap-10 mt-10 px-2 md:px-10">
      <div className="text-[32px] font-bold">Welcome to your Dashborad</div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className=" w-full md:w-[60%] h-max md:h-[220px] card1 bg-[#A9DFD8]/20 text-[#171821] rounded-[13px] px-[14px] py-[19px] flex flex-col justify-between shadow-sm">
          <div className="header">
            <h3>June Sales</h3>
            <p>Sales Summary</p>
          </div>
          <div className="flex flex-col cards md:flex-row gap-[20px]">
            <Card
              icon={<TbBusinessplan />}
              title="Total Sales"
              description="+10% from Last Month"
              amount={5000}
            />
            <Card
              icon={<TbBusinessplan />}
              title="Total Sales"
              description="+10% from Last Month"
              amount={5000}
            />
            <Card
              icon={<TbBusinessplan />}
              title="Total Sales"
              description="+10% from Last Month"
              amount={5000}
            />
            <Card
              icon={<TbBusinessplan />}
              title="Total Sales"
              description="+10% from Last Month"
              amount={5000}
            />
          </div>
        </div>
        <EarningsCard />
      </div>

      <div className="div flex flex-col md:flex-row gap-20">
        <VisitorChart />
        <TopProducts />
      </div>
    </div>
  );
}
