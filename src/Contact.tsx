import { motion, MotionValue, useTransform } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaApple,
} from "react-icons/fa6";
import { useState, useEffect, forwardRef } from "react";

// Custom hook to track mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

interface ContactSectionProps {
  scrollYProgress: MotionValue<number>;
}

const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ scrollYProgress }, ref) => {
    const { x, y } = useMousePosition(); // Cursor position
    const [isHovered, setIsHovered] = useState(false); // Hover state
    const size = isHovered ? 300 : 50; // Mask size dynamically changes on hover

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
        className="relative h-screen w-full bg-black"
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
              className="text-9xl font-black"
              style={{
                opacity: contentOpacity,
                scale: connectScale,
                translateY: connectTranslateY,
              }}
            >
              CONNECT
            </motion.h1>
            <motion.h3
              className="mt-5 text-6xl font-light"
              style={{
                scale: restScale,
                opacity: restOpacity,
                translateY: restTranslateY,
              }}
            >
              viciosocultos@gmail.com
            </motion.h3>
            <motion.div
              className="flex mt-5 justify-between gap-4"
              style={{
                scale: restScale,
                opacity: restOpacity,
                translateY: restTranslateY,
              }}
            >
              <FaSpotify size="3em" />
              <FaInstagram size="3em" />
              <FaYoutube size="3em" />
              <FaApple size="3em" />
              <FaFacebook size="3em" />
            </motion.div>
          </div>
        </motion.div>
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-9xl font-black"
            style={{
              opacity: contentOpacity,
              scale: connectScale,
              translateY: connectTranslateY,
            }}
          >
            CONNECT
          </motion.h1>
          <motion.h3
            className="mt-5 text-6xl font-light"
            style={{
              scale: restScale,
              opacity: restOpacity,
              translateY: restTranslateY,
            }}
          >
            viciosocultos@gmail.com
          </motion.h3>
          <motion.div
            className="flex mt-5 justify-between gap-4"
            style={{
              scale: restScale,
              opacity: restOpacity,
              translateY: restTranslateY,
            }}
          >
            <FaSpotify size="3em" />
            <FaInstagram size="3em" />
            <FaYoutube size="3em" />
            <FaApple size="3em" />
            <FaFacebook size="3em" />
          </motion.div>
        </div>
      </div>
    );
  }
);

export default ContactSection;
