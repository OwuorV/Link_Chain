"use client";
import { useState, useEffect } from "react";
import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";

// Icons
import { CiLocationOn, CiSun } from "react-icons/ci";
import { FaCloudRain } from "react-icons/fa6";
import { WiThermometer, WiRaindrop, WiDaySunny } from "react-icons/wi";
import { MdSolarPower } from "react-icons/md";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import clsx from "clsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherDay {
  datetime: string;
  conditions: string;
  tempmax: number;
  precip?: number;
  preciptype?: string[];
  precipprob: number;
  uvindex: number;
  solarenergy?: number | string;
}

interface WeatherCurrentConditions {
  temp: number;
  conditions: string;
  precip?: number;
}

interface WeatherResponse {
  resolvedAddress: string;
  currentConditions: WeatherCurrentConditions;
  days: WeatherDay[];
}

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [location, setLocation] = useState("Siaya");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Africa/Nairobi",
    })
  );
  const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")} EAT`;

  const chartData =
    weather && weather.days
      ? {
          labels: weather.days
            .slice(0, 7)
            .map((day) =>
              format(parse(day.datetime, "yyyy-MM-dd", new Date()), "MMM d")
            ),
          datasets: [
            {
              label: "Chance of Rain (%)",
              data: weather.days.slice(0, 7).map((day) => day.precipprob),
              borderColor: "blue",
              fill: false,
            },
            {
              label: "UV Index (Sun Intensity)",
              data: weather.days.slice(0, 7).map((day) => day.uvindex),
              borderColor: "orange",
              fill: false,
            },
          ],
        }
      : null;

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/rainfall?location=${encodeURIComponent(location)}`
        );
        const data = await res.json();
        if (res.ok) {
          setWeather(data);
        } else {
          setError(data.error || "Failed to load weather data");
          console.error("API error:", data.error);
        }
      } catch (err) {
        setError("Error fetching weather data");
        console.error("Fetch error:", err);
      }
      setLoading(false);
    }
    fetchWeather();
  }, [location]);

  const getSunIntensity = (uvindex: number) => {
    if (uvindex <= 2) return "Low";
    if (uvindex <= 5) return "Moderate";
    if (uvindex <= 7) return "High";
    if (uvindex <= 10) return "Very High";
    return "Extreme";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No data available</p>;

  return (
    <div className="p-4 h-full w-full flex flex-col items-center text-white bg-[#99b6d8]">
      <div className="flex flex-col md:w-[50%] ">
        <div className="text-2xl top-0 flex gap-2 items-center font-bold">
          {weather.resolvedAddress} <CiLocationOn />
          <p className="text-gray-500 text-base font-sm"> {formattedTime}</p>
        </div>

        <p className="text-8xl"> {weather.currentConditions.temp}°</p>
        <p className="text-3xl mt-4"> {weather.currentConditions.conditions}</p>
        <p className="text-xl mt-2">
          Precipitation:{" "}
          <span className="text-3xl font-bold">
            {weather.currentConditions.precip || 0}
          </span>{" "}
          inches
        </p>
      </div>

      {weather.days.slice(0, 3).map((day: WeatherDay) => (
        <div
          key={day.datetime}
          className="mt-6 grid grid-cols-2 gap-4 p-4 w-full md:max-w-3xl mx-auto shadow-sm bg-[#9eb9d7]/30 rounded-lg"
        >
          <h3 className="text-2xl font-semibold col-span-2 text-center">
            {format(
              parse(day.datetime, "yyyy-MM-dd", new Date()),
              "EEEE, MMMM d, yyyy"
            )}
          </h3>

          {/* Condition Block */}
          <div
            className={clsx(
              "rounded-[9px] p-4 flex flex-col items-center text-center bg-[#a2bcdd] text-white",
              {
                "bg-[#a2bcdd]": day.conditions.toLowerCase().includes("rain"),
                "bg-yellow-400": day.conditions.toLowerCase().includes("sun"),
                "bg-gray-300 text-black":
                  !day.conditions.toLowerCase().includes("rain") &&
                  !day.conditions.toLowerCase().includes("sun"),
              }
            )}
          >
            <span className="text-lg font-semibold">{day.conditions}</span>
            <div className="mt-2 text-3xl">
              {day.conditions.toLowerCase().includes("rain") && <FaCloudRain />}
              {day.conditions.toLowerCase().includes("sun") && <CiSun />}
            </div>
            <div className="mt-2 text-sm">Condition</div>
          </div>

          {/* Max Temp */}
          <div className="rounded-[9px] p-4 flex flex-col items-center bg-[#a2bcdd] text-center">
            <WiThermometer className="text-3xl mb-1" />
            <span className="text-lg font-semibold">{day.tempmax}°</span>
            <div className="mt-1 text-sm">Max Temp</div>
          </div>

          {/* Precipitation */}
          <div className="rounded-[9px] p-4 flex flex-col items-center bg-[#a2bcdd] text-center">
            <WiRaindrop className="text-3xl mb-1" />
            <span className="text-lg font-semibold">
              {day.precip || 0} inches
            </span>
            <div className="text-sm">
              {day.preciptype?.join(", ") || "None"}
            </div>
            <div className="text-sm">Precipitation</div>
          </div>

          {/* Chance of Rain */}
          <div className="rounded-[9px] p-4 flex flex-col items-center bg-[#a2bcdd] text-center">
            <FaCloudRain className="text-3xl mb-1" />
            <span className="text-lg font-semibold">{day.precipprob}%</span>
            <div className="text-sm">Chance of Rain</div>
          </div>

          {/* Sun Intensity */}
          <div className="rounded-[9px] p-4 flex flex-col items-center bg-[#a2bcdd] text-center">
            <WiDaySunny className="text-3xl mb-1" />
            <span className="text-lg font-semibold">
              {getSunIntensity(day.uvindex)}
            </span>
            <div className="text-sm">UV: {day.uvindex}</div>
            <div className="text-sm">Sun Intensity</div>
          </div>

          {/* Solar Energy */}
          <div className="rounded-[9px] p-4 flex flex-col items-center bg-[#a2bcdd] text-center">
            <MdSolarPower className="text-3xl mb-1" />
            <span className="text-lg font-semibold">
              {day.solarenergy || "N/A"}
            </span>
            <div className="text-sm">MJ/m²</div>
            <div className="text-sm">Solar Energy</div>
          </div>
        </div>
      ))}

      <input
        className="mt-6 p-2 border rounded w-full md:max-w-3xl"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <div className="mt-8 p-4 bg-white rounded border w-full shadow md:max-w-3xl">
        <h2 className="text-xl font-semibold">Weather Trends (7 Days)</h2>
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
