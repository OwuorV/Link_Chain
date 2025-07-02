"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RainfallChart() {
  const [data, setData] = useState<{ month: string; rainfall: number }[]>([]);

  useEffect(() => {
    const fetchRain = async () => {
      const res = await axios.get("/api/rainfall");
      const chartData = Object.entries(res.data).map(([month, value]) => ({
        month,
        rainfall: parseFloat((value as number).toFixed(2)),
      }));
      setData(chartData);
    };
    fetchRain();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        🌧 Monthly Rainfall Distribution (mm)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="rainfall" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
