import React, { useState, FormEvent } from "react";
import { geocodeCity } from "@/utils/api";
import { GeocodeData } from "@/types/weather";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (data: GeocodeData) => void;
  onError: (error: string) => void;
  city: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onError, city }) => {
  const [searchType, setSearchType] = useState<"city" | "geocode">("city");
  const [cityInput, setCityInput] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onError("");
    if (searchType === "city") {
      try {
        const data = await geocodeCity(cityInput);
        onSearch(data);
        setCityInput("");
        setIsSearchOpen(false);
      } catch (error) {
        onError(error instanceof Error ? error.message : "City not found");
      }
    } else {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      if (isNaN(latNum) || isNaN(lonNum)) {
        onError("Please enter valid latitude and longitude values");
        return;
      }
      onSearch({ lat: latNum, lon: lonNum, city: `Lat: ${latNum}, Lon: ${lonNum}` });
      setLat("");
      setLon("");
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 w-full">
        <span className="text-2xl font-semibold">{city || "Loading..."}</span>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 text-lg"
        >
          Search
        </button>
      </div>
      {isSearchOpen && (
        <div className="mt-4 w-full max-w-md glass p-4">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                searchType === "city" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setSearchType("city")}
            >
              City Search
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                searchType === "geocode" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setSearchType("geocode")}
            >
              Geocode Search
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            {searchType === "city" ? (
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            ) : (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="Latitude"
                  className="w-1/2 px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="text"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  placeholder="Longitude"
                  className="w-1/2 px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;