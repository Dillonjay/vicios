import { motion, useTransform, MotionValue } from "framer-motion";

interface LetterProps {
  letter: string;
  scrollYProgress: MotionValue<number>;
  stagger: number;
}

const Letter = ({ letter, scrollYProgress, stagger }: LetterProps) => {
  // Y position based on scroll and stagger
  const letterY = useTransform(
    scrollYProgress,
    [0.62 + stagger * 0.05, 0.74 + stagger * 0.05], // Delay each letter
    [-100, 0]
  );

  // Opacity based on scroll and stagger
  const opacity = useTransform(
    scrollYProgress,
    [0.62 + stagger * 0.05, 0.74 + stagger * 0.05],
    [0, 1]
  );

  return (
    <motion.span
      style={{
        translateY: letterY,
        opacity, // Fades in as it falls
      }}
      className="inline-block mx-2" // Add spacing between letters
    >
      {letter === " " ? "\u00A0" : letter} {/* Preserve spaces */}
    </motion.span>
  );
};

export default Letter;
