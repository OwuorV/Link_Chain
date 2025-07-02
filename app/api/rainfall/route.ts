import { NextResponse } from "next/server";

// Define TypeScript interfaces
interface WeatherResponse {
  resolvedAddress: string;
  timezone: string;
  currentConditions: WeatherCondition;
  days: WeatherDay[];
}

interface WeatherCondition {
  datetime: string;
  temp: number;
  precip: number | null;
  preciptype: string[] | null;
  precipprob: number;
  conditions: string;
  uvindex: number;
  solarenergy: number | null;
}

interface WeatherDay {
  datetime: string;
  tempmax: number;
  precip: number | null;
  preciptype: string[] | null;
  precipprob: number;
  conditions: string;
  uvindex: number;
  solarenergy: number | null;
}

interface ErrorResponse {
  error: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "Siaya";
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;

  if (!apiKey) {
    console.error("API key is missing");
    return NextResponse.json(
      { error: "Server configuration error: API key missing" },
      { status: 500 }
    );
  }

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}?unitGroup=us&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(apiUrl);
    console.log("API Response Status:", response.status, response.statusText);
    console.log(
      "API Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("API error response:", text);
      return NextResponse.json(
        { error: `API error: ${text || response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      return NextResponse.json(
        { error: "Invalid response format from API" },
        { status: 500 }
      );
    }

    const data: WeatherResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
