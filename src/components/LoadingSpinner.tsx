import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}
// TODO: Make this cooler
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "white",
}) => {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} border-t-2 border-b-2 border-l-2 rounded-full`}
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
