import { motion, MotionValue, useTransform } from "framer-motion";
import { RefObject } from "react";

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
  homeRef: RefObject<HTMLDivElement>;
}

export const HeroSection = ({ scrollYProgress, homeRef }: HeroSectionProps) => {
  // Opacity animation for "OCULTOS" text
  const ocultosOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  return (
    <motion.div
      id="home-section"
      ref={homeRef}
      className="w-full h-[150vh] relative bg-black"
    >
      <motion.div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4">
        <motion.h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white z-20 text-center">
          VICIOS
        </motion.h1>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-7xl font-black text-white text-center"
          style={{
            opacity: ocultosOpacity,
          }}
        >
          OCULTOS
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
