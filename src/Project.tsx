import { forwardRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface FallingTextProps {
  phrase: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}

const FallingText = ({ phrase, index, scrollYProgress }: FallingTextProps) => {
  // Define staggered animation ranges based on index
  const staggerStart = 0.73 + index * 0.02; // Start later for each line
  const staggerEnd = 0.78 + index * 0.02;

  // Calculate transforms for opacity and position
  const opacity = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [0, 1]
  );
  const translateY = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [20, 0]
  );
  const translateX = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [-220, 0]
  );

  return (
    <motion.p
      className="text-6xl text-white font-bold"
      style={{
        opacity,
        y: translateY,
        x: translateX,
      }}
    >
      {phrase}
    </motion.p>
  );
};

interface ProjectSectionProps {
  scrollYProgress: MotionValue<number>;
}

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ scrollYProgress }, ref) => {
    // Falling Text Animation Data
    const phrases = ["The night isn't over", "Until I'm", "Far from", "Sober"];

    return (
      <div
        id="music-section"
        ref={ref}
        className="h-screen bg-black flex flex-col gap-10"
        style={{
          background: `
  linear-gradient(
    rgba(0, 0, 0, 1) 0%,
    rgba(20, 20, 20, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  ),
  radial-gradient(
    circle,
    rgba(30,30, 30, 1) 0%,
    rgba(0, 0, 0, 1) 80%
  )`,
        }}
      >
        <div className="w-full flex flex-col px-48">
          {phrases.map((phrase, index) => (
            <FallingText
              phrase={phrase}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
        {/* Animated Falling Text controlled by scrollYProgress */}
        <motion.h2>The Project</motion.h2>
        <motion.div
          className="w-2/3 text-center border border-gray-700 p-6 text-white flex"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="bg-center bg-cover bg-[url('./assets/cierto-cover.jpeg')] z-40"
            style={{
              width: "300px",
              height: "300px",
              boxShadow: "0 0 40px -3px rgba(300, 300, 300, 0.7)",
            }}
          />
          <h3 className="text-2xl font-bold">Band Member 1</h3>
          <p>Placeholder for band member description or image.</p>
        </motion.div>

        <motion.div
          className="w-2/3 text-center border border-gray-700 p-6 text-white"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold">Band Member 2</h3>
          <p>Placeholder for band member description or image.</p>
        </motion.div>
      </div>
    );
  }
);

export default ProjectSection;
