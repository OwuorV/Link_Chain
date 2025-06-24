import React from "react";
interface CardProps {
  title: String;
  description: String;
  amount: number;
  icon?: React.ReactNode;
}
export default function Card({ title, description, icon, amount }: CardProps) {
  return (
    <div className="shadow-sm text-[#171821] bg-[#A9DFD8] rounded-[10px] py-[11px] px-[9px] md:w-[150px] w-full h-[200px] md:h-[107px] flex flex-col gap-1.5">
      <div>
        {icon && (
          <div className=" w-[30px] md:w-[24px] h-[30px] md:h-[24px]">
            {" "}
            {icon}
          </div>
        )}
      </div>

      {amount !== undefined && (
        <div className="amount text-[25px] md:text-[15px] font-semibold">
          <h3> {amount}</h3>
        </div>
      )}
      <div className="title flex flex-col gap-1 mt-1">
        <div className="title md:text-[10px] text-[13px] ">{title}</div>
        {description && (
          <div className="md:text-[8px] text-[15px] ">{description}</div>
        )}
      </div>
    </div>
  );
}
