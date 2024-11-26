import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

const FallingText = ({
  text,
  scrollYProgress,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const letters = text.split("");

  // Define a single range for all letters
  const yOffsets = letters.map((_, index) => -50 + index * 10); // Slightly staggered drop
  const opacities = letters.map((_, index) => 0.2 + index * 0.05); // Slightly staggered fade-in

  // A single hook for managing animation ranges
  const y = useTransform(scrollYProgress, [0.2, 0.5], [-50, 0]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <div className="flex justify-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block text-4xl font-bold text-white"
          style={{
            y: `calc(${y.get()}px + ${yOffsets[index]}px)`, // Adds an offset per letter
            opacity: opacity.get() * (opacities[index] || 1), // Adjusts fade per letter
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default FallingText;
