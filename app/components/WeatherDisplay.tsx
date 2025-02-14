"use client";

import { Cloud, CloudRain, Sun } from "lucide-react";

import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { Variant } from "@/types";
import dynamic from "next/dynamic";
const WeatherDisplayVariantA = dynamic(
  () => import("./AB/weatherDisplay/WeatherDisplayVariantA")
);
const WeatherDisplayVariantB = dynamic(
  () => import("./AB/weatherDisplay/WeatherDisplayVariantB")
);

type Props = {
  city: string;
  variant: Variant;
};

export const WeatherIcon = ({ description }: { description: string }) => {
  const icon = description.toLowerCase().includes("rain") ? (
    <CloudRain className="w-8 h-8" />
  ) : description.toLowerCase().includes("cloud") ? (
    <Cloud className="w-8 h-8" />
  ) : (
    <Sun className="w-8 h-8" />
  );

  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-full">{icon}</div>
  );
};

export function WeatherDisplay({ city, variant }: Props) {
  const { weather, loading, error } = useWeatherQuery(city);

  if (loading)
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="w-full p-6 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg">
        <div className="text-red-500 dark:text-red-400 text-center">
          <span className="font-semibold">Error:</span> {error}
        </div>
      </div>
    );

  if (!weather) return null;

  const WeatherDisplayVariant =
    variant === "B" ? WeatherDisplayVariantB : WeatherDisplayVariantA;

  return <WeatherDisplayVariant city={city} weather={weather} />;
}
