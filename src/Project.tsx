import { forwardRef, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import viciosCierto from "./assets/cierto-cover.jpeg";
import viciosBack from "./assets/vicios-back-cover.png";
import viciosOndos from "./assets/vicios-1.jpeg";
import { MusicButton } from "./MusicButton";
import { ImSpinner3 } from "react-icons/im";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
import { messages } from "./projectMessages";

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
    [-110, 0]
  );

  return (
    <motion.p
      className="text-3xl md:text-4xl lg:text-6xl text-white font-bold"
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
{
  /* <div className="relative h-[220vh]">
<div className="sticky top-0 h-screen max-w-[100rem] mx-auto">
  <motion.div
    className="absolute bottom-2 border-b-4 border-[#4b4b4a] w-full flex justify-end z-30 px-[5em]"
    style={{
      opacity: storyOpacity,
      translateY: storyTranslateY,
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-white text-7xl font-black uppercase tracking-wide">
      <FormattedMessage {...messages.title} />
    </div>
  </motion.div>
  <motion.div
   */
}

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ scrollYProgress }, ref) => {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    const phrases = ["The night isn't over", "Until I'm", "Far from", "Sober"];
    const projectOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);
    const projectTranslateY = useTransform(
      scrollYProgress,
      [0.9, 0.95],
      [0, 65]
    );

    return (
      <div
        className="relative h-[100vh] "
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
        <div
          id="project-section"
          ref={ref}
          className="max-w-[100rem] mx-auto px-[5em]"
        >
          <motion.div
            className="absolute right-0 w-full flex justify-end z-30 bottom-2 border-b-4 border-[#4b4b4a] px-[5em]"
            style={{
              opacity: projectOpacity,
              translateY: projectTranslateY,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-wide">
              <FormattedMessage {...messages.title} />
            </div>
          </motion.div>

          {/* Falling Text and Image Row */}
          <div className="flex flex-col md:flex-row justify-between pt-12 md:pt-24">
            <div className="flex flex-col mb-8 md:mb-0">
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

            <div className="relative w-48 h-48 md:w-80 md:h-80 mx-auto md:mx-0">
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
          <div className="mt-12 md:mt-24 sticky top-0">
            {/* Lo Cierto */}
            <div
              className="border-b border-white py-3 md:py-4 cursor-pointer flex flex-col md:flex-row justify-between items-center"
              onMouseEnter={() => setHoveredImage(viciosCierto)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2 md:mb-0">
                Lo Cierto
              </h3>

              <div className="flex gap-2 md:gap-0">
                <MusicButton
                  icon={FaSpotify}
                  href="https://open.spotify.com/artist/viciososocultos"
                />
                <MusicButton
                  icon={FaYoutube}
                  href="https://youtube.com/@viciososocultos"
                />
                <MusicButton
                  icon={FaApple}
                  href="https://music.apple.com/artist/viciososocultos"
                />
              </div>
            </div>

            {/* Ondos */}
            <div
              className="border-b border-white py-3 md:py-4 cursor-pointer flex flex-col md:flex-row justify-between items-center"
              onMouseEnter={() => setHoveredImage(viciosOndos)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">
                  <FormattedMessage {...messages.comingSoon} />
                </h3>
                <ImSpinner3
                  className="text-white text-2xl md:text-3xl lg:text-4xl animate-spin"
                  style={{ animationDuration: "2s" }}
                />
              </div>
              <div className="flex gap-2 md:gap-0">
                <MusicButton
                  icon={FaSpotify}
                  href="https://open.spotify.com/artist/viciososocultos"
                />
                <MusicButton
                  icon={FaYoutube}
                  href="https://youtube.com/@viciososocultos"
                />
                <MusicButton
                  icon={FaApple}
                  href="https://music.apple.com/artist/viciososocultos"
                />
              </div>
            </div>
          </div>

          {hoveredImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-md w-full">
                <img
                  src={hoveredImage}
                  alt="Album Cover"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setHoveredImage(null)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ProjectSection;
