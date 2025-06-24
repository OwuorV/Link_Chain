"use client";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function EarningsCard() {
  const percentage = 80;

  return (
    <div className="rounded-xl bg-[#eafaf7] p-6 w-full md:w-[300px] h-[220px] mb-3 shadow-sm">
      <h2 className="font-semibold text-[15px]">Earnings</h2>
      <p className="text-[11px] text-gray-600">Total Expense</p>
      <h3 className="text-[18px] font-bold mt-1">$6078.76</h3>
      <p className="text-[12px] text-gray-600 mt-1">
        Profit is <span className="font-semibold">48%</span> more than last
        month
      </p>

      <div className="mt-4 relative transform scale-110 flex flex-col items-center justify-center">
        <CircularProgressbarWithChildren
          value={percentage}
          maxValue={100}
          styles={buildStyles({
            pathColor: "#00FFE0",
            trailColor: "#000",
            strokeLinecap: "butt",
          })}
          circleRatio={0.5}
          className="rotate-[-90deg] h-[150px] w-[150px]"
        >
          <div className="absolute text-center font-semibold text-black text-[20px]">
            {percentage}%
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
