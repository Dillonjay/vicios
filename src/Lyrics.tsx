import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LyricsAnimator = ({ lyrics }) => {
  const lines = lyrics.split("\n");
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 3000); // Change line every 3 seconds
    return () => clearInterval(interval);
  }, [lines.length]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 70,
      scale: 1,
      x: 0,
      transition: { duration: 2 },
    }, // Line starts lower and fades out
    visible: { opacity: 1, y: 0, scale: 1, x: 0, transition: { duration: 2 } }, // Line appears in place
    exiting: {
      opacity: 0,
      y: -70,
      scale: 0.9,
      x: -30,
      transition: { duration: 2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.h1
        key={currentLine}
        className="absolute text-white text-7xl font-black"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exiting"
      >
        {lines[currentLine]}
      </motion.h1>
    </AnimatePresence>
  );
};

export default LyricsAnimator;
