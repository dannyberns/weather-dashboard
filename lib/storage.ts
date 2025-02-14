import { City } from "@/types";
import { sessionStorageHandler } from "./sessionStorage";
import { RECENT_CITIES_KEY } from "@/consts";

export const addToRecentCities = (cityName: string) => {
  const cities: City[] =
    sessionStorageHandler.get<City[]>(RECENT_CITIES_KEY) || [];

  cities.unshift({
    name: cityName,
    lastViewed: Date.now(),
    isFavorite: false,
  });

  // remove duplicated cities
  const cityMap = new Map<string, City>(
    cities.map((city) => [city.name.toLowerCase(), city])
  );

  // Keep only last 5 cities
  const updatedCities = Array.from(cityMap.values()).slice(0, 5);
  sessionStorageHandler.set(RECENT_CITIES_KEY, updatedCities);

  return updatedCities;
};
