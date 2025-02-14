"use client";
import { useEffect, useState } from "react";

import ErrorBoundary from "@/app/components/ErrorBoundary";
import RecentSearches from "@/app/components/RecentSearches";
import SearchBar from "@/app/components/SearchBar";
import { WeatherDisplay } from "@/app/components/WeatherDisplay";
import { addToRecentCities } from "@/lib/storage";
import { City } from "@/types";
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { sessionStorageHandler } from "@/lib/sessionStorage";
import { RECENT_CITIES_KEY } from "@/consts";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const variant = useAppSelector((state: RootState) => state.abTest.variant);

  useEffect(() => {
    const storedCities =
      sessionStorageHandler.get<City[]>(RECENT_CITIES_KEY) || [];
    setCities(storedCities);
  }, []);

  const handleSearch = async (city: string) => {
    const response = await fetch(`/api/location/search?query=${city}`);
    const data = await response.json();
    if (data.length > 0) {
      setSelectedCity(city);
      const updatedCities = addToRecentCities(city);
      setCities(updatedCities);
    }
  };

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4">
        <div className="flex justify-between md:items-center mb-3 flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-4">
            <p className="text-blue-700 dark:text-blue-300">
              Enter a city name to get the current weather conditions
            </p>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {selectedCity && (
          <WeatherDisplay city={selectedCity} variant={variant} />
        )}

        <RecentSearches cities={cities} onCityClick={setSelectedCity} />
      </main>
    </ErrorBoundary>
  );
}
