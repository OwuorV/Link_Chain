"use client";
import { useState, useEffect } from "react";
import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";
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

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState("Siaya");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Nairobi",
  });
  const newHour = new Date(currentTime).getHours();
  const newMinutes = new Date(currentTime).getMinutes();
  const newSeconds = new Date(currentTime).getSeconds();

  const formattedTime = `${newHour.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")} EAT`;

  // Only define chartData after weather is loaded
  const chartData =
    weather && weather.days
      ? {
          labels: weather.days
            .slice(0, 7)
            .map((day: any) =>
              format(parse(day.datetime, "yyyy-MM-dd", new Date()), "MMM d")
            ),
          datasets: [
            {
              label: "Chance of Rain (%)",
              data: weather.days.slice(0, 7).map((day: any) => day.precipprob),
              borderColor: "blue",
              fill: false,
            },
            {
              label: "UV Index (Sun Intensity)",
              data: weather.days.slice(0, 7).map((day: any) => day.uvindex),
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No data available</p>;

  const formatDateTime = (datetime: string) => {
    try {
      const date = parse(datetime, "yyyy-MM-dd'T'HH:mm:ss", new Date());
      return format(date, "h:mm a 'EAT' 'on' EEEE, MMMM d, yyyy", {
        locale: enUS,
      });
    } catch {
      return datetime;
    }
  };

  // Map UV index to sun intensity description
  const getSunIntensity = (uvindex: number) => {
    if (uvindex <= 2) return "Low";
    if (uvindex <= 5) return "Moderate";
    if (uvindex <= 7) return "High";
    if (uvindex <= 10) return "Very High";
    return "Extreme";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Weather in {weather.resolvedAddress}
      </h1>
      <p>Local Time: {formattedTime}</p>
      <h2 className="text-xl mt-4">Current Conditions</h2>
      <p>Condition: {weather.currentConditions.conditions}</p>
      <p>Temperature: {weather.currentConditions.temp}°F</p>
      Precipitation: {weather.currentConditions.precip || 0} inches
      {weather.days.slice(0, 3).map((day: WeatherDay) => (
        <div key={day.datetime} className="mt-2 p-2 border rounded">
          <h3>
            {format(
              parse(day.datetime, "yyyy-MM-dd", new Date()),
              "EEEE, MMMM d, yyyy"
            )}
          </h3>
          <p>Condition: {day.conditions}</p>
          <p>Max Temp: {day.tempmax}°F</p>
          <p>
            Precipitation: {day.precip || 0} inches (
            {day.preciptype?.join(", ") || "None"})
          </p>
          <p>Chance of Rain: {day.precipprob}%</p>
          <p>
            Sun Intensity: {getSunIntensity(day.uvindex)} (UV: {day.uvindex})
          </p>
          <p>Solar Energy: {day.solarenergy || "N/A"} MJ/m²</p>
        </div>
      ))}
      <input
        className="mt-4 p-2 border rounded w-full"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="mt-6 p-4 bg-white rounded border w-full shadow">
        <h2 className="text-xl font-semibold">Weather Trends (7 Days)</h2>
        {chartData && (
          <Line
            data={chartData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        )}
      </div>
    </div>
  );
}
