import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Line = ({ text }: { text: string | null }) => {
  const ellipsisVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exiting: {
      opacity: 0,
      y: -5,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 1,
      // x: 0,
      transition: { duration: 1 },
    }, // Line starts lower and fades out
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } }, // Line appears in place
    exiting: {
      opacity: 0,
      y: -35,
      scale: 0.9,
      // x: -30,
      transition: { duration: 1 },
    },
  };
  if (text) {
    return (
      <motion.h1
        className="absolute left-0 text-white text-3xl font-black origin-left"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exiting"
      >
        {text}
      </motion.h1>
    );
  }

  return (
    <motion.div
      className="absolute left-0 flex space-x-1"
      variants={ellipsisVariants}
      initial="hidden"
      animate="visible"
      exit="exiting"
    >
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      ></motion.span>
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      ></motion.span>
      <motion.span
        className="w-2 h-2 bg-white rounded-full"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      ></motion.span>
    </motion.div>
  );
};
const LyricsAnimator = ({ lyrics }: { lyrics: string[] }) => {
  // Adding null her so that the ellipsis can be displayed at the end before looping
  const lines = [...lyrics, null];
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [lines.length]);

  const displayLine = lines[currentLine];
  return (
    <AnimatePresence>
      <Line text={displayLine} key={displayLine ?? "ellpsis"} />
    </AnimatePresence>
  );
};

export default LyricsAnimator;
