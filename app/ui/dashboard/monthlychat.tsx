"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", visitors: 100 },
  { month: "Feb", visitors: 20 },
  { month: "Mar", visitors: 400 },
  { month: "Apr", visitors: 10 },
  { month: "May", visitors: 500 },
  { month: "Jun", visitors: 470 },
  { month: "Jul", visitors: 80 },
  { month: "Aug", visitors: 420 },
  { month: "Sep", visitors: 410 },
  { month: "Oct", visitors: 0 },
  { month: "Nov", visitors: 230 },
  { month: "Dec", visitors: 310 },
];

export default function VisitorChart() {
  return (
    <div className="cursor-pointer rounded-[12px] w-full md:w-[600px] h-[250px] bg-[#e5f6f3] p-2 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Visitor Insights</h2>
      <ResponsiveContainer className="w-[90%] h-[80%]">
        <AreaChart className="cursor-pointer" data={data}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#00c49f" stopOpacity={0.4} />
              <stop offset="80%" stopColor="#00c49f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            className="text-[10px] font-semibold w-[375px] h-[12px]"
          />
          <YAxis />
          <Tooltip />
          <Area
            className="cursor-pointer"
            type="monotone"
            dataKey="visitors"
            stroke="#00c49f"
            fillOpacity={1}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
