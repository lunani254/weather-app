"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import UnitToggle from "@/components/UnitToggle";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import WeatherDetails from "@/components/WeatherDetails";
import { fetchWeather } from "@/utils/api";
import { GeocodeData, WeatherData } from "@/types/weather";

export default function Home() {
  const [geocodeData, setGeocodeData] = useState<GeocodeData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (data: GeocodeData) => {
    setGeocodeData(data);
    setLoading(true);
    setError("");
    try {
      const weatherData = await fetchWeather(data.lat, data.lon, units);
      setWeather(weatherData);
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = async (newUnits: "metric" | "imperial") => {
    if (newUnits === units || !geocodeData) return;
    setUnits(newUnits);
    setLoading(true);
    setError("");
    try {
      const weatherData = await fetchWeather(geocodeData.lat, geocodeData.lon, newUnits);
      setWeather(weatherData);
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearch({ lat: latitude, lon: longitude, city: "Your Location" });
        },
        () => {
          handleSearch({ lat: 1.2921, lon: 36.8219, city: "Nairobi" });
        }
      );
    } else {
      handleSearch({ lat: 1.2921, lon: 36.8219, city: "Nairobi" });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Search Bar and Unit Toggle */}
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} onError={setError} city={geocodeData?.city || null} />
        <UnitToggle units={units} onToggle={handleUnitToggle} />
      </div>

      {loading && <p className="text-center text-white text-lg">Loading...</p>}
      {error && <p className="text-center text-red-300 text-lg">{error}</p>}

      {/* Main Content */}
      <div className="main-content">
        <div className="flex-1">
          <CurrentWeather weather={weather} units={units} city={geocodeData?.city || null} />
        </div>
        <div className="right-column">
          <WeatherDetails weather={weather} />
          <Forecast weather={weather} units={units} />
        </div>
      </div>
    </div>
  );
}