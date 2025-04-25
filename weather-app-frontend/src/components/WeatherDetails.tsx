import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";
import { WiWindy, WiHumidity, WiBarometer, WiRain } from "react-icons/wi";

interface WeatherDetailsProps {
  weather: WeatherData | null;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  if (!weather) {
    return (
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-gray-300 italic text-sm">Weather details unavailable</p>
      </motion.div>
    );
  }

  const { current } = weather;

  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-4">More Details:</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <WiWindy size={24} className="text-gray-300" />
          <p className="text-gray-300 text-sm">
            Wind: {Math.round(current.wind_speed)} m/s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <WiHumidity size={24} className="text-gray-300" />
          <p className="text-gray-300 text-sm">Humidity: {current.humidity}%</p>
        </div>
        <div className="flex items-center gap-2">
          <WiBarometer size={24} className="text-gray-300" />
          <p className="text-gray-300 text-sm">
            Pressure: {Math.round(current.humidity * 10)} hPa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <WiRain size={24} className="text-gray-300" />
          <p className="text-gray-300 text-sm">Precipitation: 2%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDetails;