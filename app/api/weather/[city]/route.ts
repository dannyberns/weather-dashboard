import { API_KEY, OPENWEATHER_BASE_URL } from "@/consts";
import { WeatherData } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ city: string }> }
) {
  const city = (await params).city;

  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    const weatherData: WeatherData = {
      temperature: data.main?.temp,
      description: data.weather[0]?.description,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      feelsLike: data.main?.feels_like,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
