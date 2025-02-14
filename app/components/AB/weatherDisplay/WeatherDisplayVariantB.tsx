import { WeatherData } from "@/types";
import { Droplets, Thermometer, Wind } from "lucide-react";
import React from "react";
import { WeatherIcon } from "../../WeatherDisplay";

type Props = {
  city: string;
  weather: WeatherData;
};

const WeatherDisplayVariantB = ({ city, weather }: Props) => {
  const weatherDetails = [
    {
      id: "humidity",
      label: "Humidity",
      value: `${weather.humidity}%`,
      icon: <Droplets className="w-5 h-5 dark:text-blue-400" />,
    },
    {
      id: "windSpeed",
      label: "Wind",
      value: `${weather.windSpeed} m/s`,
      icon: <Wind className="w-5 h-5 dark:text-blue-400" />,
    },
    {
      id: "feelsLike",
      label: "Feels like",
      value: `${Math.round(weather.feelsLike)}°`,
      icon: <Thermometer className="w-5 h-5 dark:text-blue-400" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-col md:items-start md:justify-between gap-6">
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4 justify-between">
            <h2
              className="text-3xl font-bold capitalize 
               text-gray-800 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-400 
               dark:text-transparent dark:bg-clip-text"
            >
              {city}
            </h2>

            <span className="px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 text-blue-700 dark:text-blue-300 rounded-full">
              Celsius
            </span>
          </div>

          <div className="flex items-center gap-4">
            <WeatherIcon description={weather.description} />
            <div>
              <p className="text-7xl font-bold text-gray-800 dark:text-blue-400">
                {Math.round(weather.temperature)}°
                <span className="text-3xl">C</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">
                {weather.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-3 w-full">
          {weatherDetails.map(({ id, label, value, icon }) => (
            <div
              key={id}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex items-center gap-3"
            >
              {icon}
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-0">
                  {label}
                </div>
                <dd className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplayVariantB;
