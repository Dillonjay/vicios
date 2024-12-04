import { forwardRef, useState } from "react";
import {
  motion,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import viciosCierto from "./assets/cierto-cover.jpeg";
import viciosBack from "./assets/vicios-back-cover.png";
import viciosOndos from "./assets/vicios-1.jpeg";
import MusicButton from "./MusicButton";
import { ImSpinner3 } from "react-icons/im";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa6";
import LyricsAnimator from "./Lyrics";

interface FallingTextProps {
  phrase: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

const FallingText = ({
  phrase,
  index,
  scrollYProgress,
  start,
  end,
}: FallingTextProps) => {
  // Falling text animations
  const staggerStart = start + index * 0.02;
  const staggerEnd = end + index * 0.02;

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

const ciertoLetras = [
  "For stories to be told",
  "Let the memories unfold",
  "Lo cierto no se va",
  "Lo cierto al final",
];

const letras = [
  "Lo cierto al final",
  "Lo cierto no se va",
  "Let the memories unfold",
  "For stories to be told",
];
const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ scrollYProgress }, ref) => {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    const phrases = ["The night isn't over", "Until I'm", "Far from", "Sober"];

    return (
      <div
        id="project-section"
        ref={ref}
        className="h-[100vh] bg-black px-32 relative"
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
        {/* Falling Text and Image Row */}
        <div className="flex justify-between pt-24">
          <div className="flex flex-col">
            {phrases.map((phrase, index) => (
              <FallingText
                key={index}
                phrase={phrase}
                index={index}
                scrollYProgress={scrollYProgress}
                start={0.75}
                end={0.78}
              />
            ))}
          </div>

          <div className="relative w-80 h-80">
            {/* Default Image */}
            <motion.img
              src={viciosBack}
              alt="Default"
              className="absolute w-full h-full object-cover"
              animate={{ opacity: hoveredImage === null ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {/* Lo Cierto Image */}
            <motion.img
              src={viciosCierto}
              alt="Cierto Cover"
              className="absolute w-full h-full object-cover"
              animate={{ opacity: hoveredImage === viciosCierto ? 1 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {/* Ondos Image */}
            <motion.img
              src={viciosOndos}
              alt="Ondos Cover"
              className="absolute w-full h-full object-cover"
              animate={{ opacity: hoveredImage === viciosOndos ? 1 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Horizontal Lines */}
        <div className="mt-24 sticky top-0">
          {/* Lo Cierto */}
          <div
            className="border-b border-white py-4 cursor-pointer flex justify-between"
            onMouseEnter={() => setHoveredImage(viciosCierto)}
            onMouseLeave={() => setHoveredImage(null)} // Reset to default
          >
            <h3 className="text-4xl text-white font-bold">Lo Cierto</h3>

            <div className="flex gap-0">
              <MusicButton icon={FaSpotify} href="https://spotify.com" />
              <MusicButton icon={FaYoutube} href="https://spotify.com" />
              <MusicButton icon={FaApple} href="https://spotify.com" />
            </div>
          </div>

          {/* Ondos */}
          <div
            className="border-b border-white py-4 cursor-pointer flex justify-between"
            onMouseEnter={() => setHoveredImage(viciosOndos)}
            onMouseLeave={() => setHoveredImage(null)} // Reset to default
          >
            <div className="flex items-center gap-3">
              <h3 className="text-4xl text-white font-bold">Coming Soon</h3>
              <ImSpinner3
                className="text-white text-4xl animate-spin"
                style={{ animationDuration: "2s" }}
              />
            </div>
            <div className="flex gap-0">
              <MusicButton icon={FaSpotify} href="https://spotify.com" />
              <MusicButton icon={FaYoutube} href="https://spotify.com" />
              <MusicButton icon={FaApple} href="https://spotify.com" />
            </div>
          </div>
        </div>

        {hoveredImage && (
          <motion.div
            className="relative whitespace-nowrap px-32 mt-24"
            animate={{ opacity: 1, display: "block" }}
            initial={{ opacity: 0, display: "none" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <LyricsAnimator
              lyrics={hoveredImage === viciosCierto ? letras : []}
            />
          </motion.div>
        )}
      </div>
    );
  }
);

export default ProjectSection;
