import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";

interface ForecastProps {
  weather: WeatherData | null;
  units: "metric" | "imperial";
}

const Forecast: React.FC<ForecastProps> = ({ weather, units }) => {
  if (!weather) {
    return (
      <motion.div
        className="forecast-horizontal glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-gray-300 italic text-sm">No forecast available</p>
      </motion.div>
    );
  }

  const forecastDays = weather.forecast.slice(0, 3);
  const unitSymbol = units === "metric" ? "C" : "F";

  return (
    <motion.div
      className="forecast-horizontal glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Forecast</h3>
      <div className="flex justify-between gap-4">
        {forecastDays.map((day, index) => {
          const iconUrl = `http://openweathermap.org/img/wn/${day.icon}.png`;
          const getWeatherDescription = (icon: string) => {
            if (icon.startsWith("01")) return "Sunny";
            if (icon.startsWith("02")) return "Partly cloudy";
            if (icon.startsWith("03")) return "Cloudy";
            if (icon.startsWith("04")) return "Overcast";
            if (icon.startsWith("09")) return "Light rain";
            if (icon.startsWith("10")) return "Rain";
            if (icon.startsWith("11")) return "Thunderstorm";
            if (icon.startsWith("13")) return "Snow";
            if (icon.startsWith("50")) return "Mist";
            return "Unknown";
          };

          return (
            <div key={index} className="text-center flex-1">
              <p className="text-gray-300 text-sm">{day.date}</p>
              <img src={iconUrl} alt="Forecast icon" className="mx-auto w-8 h-8 mt-2" />
              <p className="text-white text-sm mt-2">
                {Math.round(day.temperature - 4)}°/{Math.round(day.temperature)}°{unitSymbol}
              </p>
              <p className="text-gray-300 text-xs capitalize mt-1">
                {getWeatherDescription(day.icon)}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Forecast;