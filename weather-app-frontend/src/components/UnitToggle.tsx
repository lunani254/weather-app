import { motion } from "framer-motion";

interface UnitToggleProps {
  units: "metric" | "imperial";
  onToggle: (units: "metric" | "imperial") => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <motion.div
      className="flex gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          units === "metric" ? "bg-gray-600 text-white" : "bg-transparent text-gray-300"
        }`}
        onClick={() => onToggle("metric")}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          units === "imperial" ? "bg-gray-600 text-white" : "bg-transparent text-gray-300"
        }`}
        onClick={() => onToggle("imperial")}
      >
        °F
      </button>
    </motion.div>
  );
};

export default UnitToggle;