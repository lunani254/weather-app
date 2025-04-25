import { GeocodeData, WeatherData } from "@/types/weather";

const BASE_URL = "http://127.0.0.1:8000/api";

export const geocodeCity = async (city: string): Promise<GeocodeData> => {
  const response = await fetch(`${BASE_URL}/geocode?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error("City not found");
  }
  return response.json();
};

export const fetchWeather = async (
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherData> => {
  const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};