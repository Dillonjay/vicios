import { motion, MotionValue, useTransform } from "framer-motion";
import { FaInstagram, FaSpotify, FaYoutube, FaApple } from "react-icons/fa6";
import { useState, useEffect, forwardRef } from "react";
import { messages } from "./connectMessages";
import { FormattedMessage } from "react-intl";
import { SPOTIFY_URL, INSTAGRAM, YOUTUBE, APPLE_MUSIC } from "./constants";

// Custom hook to track mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

interface ConnectSectionProps {
  scrollYProgress: MotionValue<number>;
}

const ConnectSection = forwardRef<HTMLDivElement, ConnectSectionProps>(
  ({ scrollYProgress }, ref) => {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const size = isHovered ? 300 : 50;

    const contentOpacity = useTransform(scrollYProgress, [0.93, 1], [0, 1]);
    const connectTranslateY = useTransform(
      scrollYProgress,
      [0.93, 1],
      [100, 0]
    );
    const connectScale = useTransform(scrollYProgress, [0.93, 1], [0.7, 1.5]);

    const restTranslateY = useTransform(scrollYProgress, [0.95, 1], [100, 0]);
    const restOpacity = useTransform(scrollYProgress, [0.97, 1], [0, 1]);
    const restScale = useTransform(scrollYProgress, [0.97, 1], [0.7, 1]);

    const maskOpacity = useTransform(scrollYProgress, [0.995, 1], [0, 1]);
    return (
      <div
        id="connect-section"
        ref={ref}
        className="relative h-screen w-full bg-black overflow-hidden max-w-[100rem] mx-auto"
      >
        {/* Top Layer: White text visible by default */}
        <motion.div
          className={`absolute h-full w-full mask flex flex-col items-center justify-center z-10`}
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px`, // Dynamically adjust size
          }}
          style={{ opacity: maskOpacity }}
          transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
        >
          <div
            className="flex flex-col items-center justify-center text-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-9xl font-black"
              style={{
                opacity: contentOpacity,
                scale: connectScale,
                translateY: connectTranslateY,
              }}
            >
              <FormattedMessage {...messages.title} />
            </motion.h1>
            <motion.h3
              className="mt-5 text-3xl md:text-4xl lg:text-6xl font-light"
              style={{
                scale: restScale,
                opacity: restOpacity,
                translateY: restTranslateY,
              }}
            >
              <a
                href="mailto:viciosocultos@gmail.com"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                viciosocultos@gmail.com
              </a>
            </motion.h3>
            <motion.div
              className="flex mt-5 justify-between gap-4"
              style={{
                scale: restScale,
                opacity: restOpacity,
                translateY: restTranslateY,
              }}
            >
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                <FaSpotify size="2em" className="md:text-3xl" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size="2em" className="md:text-3xl" />
              </a>
              <a
                href={YOUTUBE.vicios}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors duration-300"
              >
                <FaYoutube size="2em" className="md:text-3xl" />
              </a>
              <a
                href={APPLE_MUSIC.vicios}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <FaApple size="2em" className="md:text-3xl" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-9xl font-black"
            style={{
              opacity: contentOpacity,
              scale: connectScale,
              translateY: connectTranslateY,
            }}
          >
            <FormattedMessage {...messages.title} />
          </motion.h1>
          <motion.h3
            className="mt-5 text-3xl md:text-4xl lg:text-6xl font-light"
            style={{
              scale: restScale,
              opacity: restOpacity,
              translateY: restTranslateY,
            }}
          >
            <a
              href="mailto:viciosocultos@gmail.com"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              viciosocultos@gmail.com
            </a>
          </motion.h3>
          <motion.div
            className="flex mt-5 justify-between gap-4"
            style={{
              scale: restScale,
              opacity: restOpacity,
              translateY: restTranslateY,
            }}
          >
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 transition-colors duration-300"
            >
              <FaSpotify size="2em" className="md:text-3xl" />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram size="2em" className="md:text-3xl" />
            </a>
            <a
              href={YOUTUBE.vicios}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors duration-300"
            >
              <FaYoutube size="2em" className="md:text-3xl" />
            </a>
            <a
              href={APPLE_MUSIC.vicios}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FaApple size="2em" className="md:text-3xl" />
            </a>
          </motion.div>
        </div>
      </div>
    );
  }
);

export default ConnectSection;
