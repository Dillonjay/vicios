import { IconType } from "react-icons";
import { useState } from "react";
import { motion } from "framer-motion";

interface MusicButtonProps {
  icon: IconType;
  href: string;
  disabled?: boolean;
}

// Very light gray for hover state
const HOVER_COLOR = "#e0e0e0"; // Very light gray

export const MusicButton: React.FC<MusicButtonProps> = ({
  icon: Icon,
  href,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noopener noreferrer"}
      className={`flex items-center justify-center p-3 md:p-4 rounded-full transition duration-300 ease-in-out ${
        disabled ? "pointer-events-none relative overflow-hidden" : ""
      }`}
      whileHover={disabled ? {} : { scale: 1.1 }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <Icon
        className={`text-2xl md:text-3xl transition-colors duration-300 ${
          disabled ? "text-gray-500" : ""
        }`}
        style={{
          color: disabled ? "#5a5a5a" : isHovered ? HOVER_COLOR : "white",
          opacity: disabled ? 0.7 : 1,
        }}
      />
      {disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            opacity: 0.2,
          }}
          animate={{
            x: ["200%", "-200%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "linear",
          }}
        />
      )}
    </motion.a>
  );
};
