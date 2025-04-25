import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";

interface CurrentWeatherProps {
  weather: WeatherData | null;
  units: "metric" | "imperial";
  city: string | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, units, city }) => {
  if (!weather || !city) {
    return (
      <motion.div
        className="current-weather glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-300 italic">No data available, please search for a city</p>
      </motion.div>
    );
  }

  const { current } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${current.icon}.png`;

  const getWeatherDescription = () => {
    switch (current.description.toLowerCase()) {
      case "clear sky":
        return "The whole day cloudy. No precipitation";
      case "few clouds":
        return "Mostly clear with a few scattered clouds.";
      case "scattered clouds":
        return "Clouds are spread out across the sky.";
      case "broken clouds":
        return "Mostly cloudy with some breaks of clear sky.";
      case "overcast clouds":
        return "Completely cloudy with no sun visible.";
      case "light rain":
        return "A gentle drizzle, you might need an umbrella.";
      case "rain":
        return "Steady rain, better stay indoors or bring a raincoat.";
      case "thunderstorm":
        return "Stormy weather with thunder and lightning.";
      default:
        return "Current weather conditions.";
    }
  };

  return (
    <motion.div
      className="current-weather glass"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        {/* Date and Location */}
        <p className="text-lg font-semibold mb-4">
          {new Date(weather.current.date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        <p className="text-xl font-semibold mb-6">{city}</p>

        {/* Weather Details */}
        <div className="flex items-center gap-4 mb-6">
          <img src={iconUrl} alt="Weather icon" className="w-20 h-20" />
          <div>
            <h2 className="text-6xl font-bold">
              {Math.round(current.temperature)}°{units === "metric" ? "C" : "F"}
            </h2>
            <p className="text-gray-300 text-lg">
              Feels like {Math.round(current.temperature + 1)}°
            </p>
            <p className="text-gray-300 text-lg capitalize">{getWeatherDescription()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;