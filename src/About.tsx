import React, { forwardRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

import vicios1 from "./assets/vicios-1.jpeg";
import vicios3 from "./assets/vicios-3.jpeg";
import vicios4 from "./assets/vicios-4.jpeg";
import vicios5 from "./assets/vicios-5.jpeg";

interface AboutSectionProps {
  opacity: MotionValue<number>;
  textOpacity: MotionValue<number>;
  translateY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ opacity, translateY, scrollYProgress, textOpacity }, ref) => {
    // Animations for each image
    const slideInFromLeft = useTransform(
      scrollYProgress,
      [0.15, 0.35],
      [-800, 0]
    );
    const slideInFromRight = useTransform(
      scrollYProgress,
      [0.15, 0.35],
      [800, 0]
    );
    const slideInFromTop = useTransform(
      scrollYProgress,
      [0.25, 0.4],
      [-200, 0]
    );
    const slideInFromBottom = useTransform(
      scrollYProgress,
      [0.25, 0.4],
      [200, 0]
    );
    const fadeIn = useTransform(scrollYProgress, [0.29, 0.52], [0, 1]); // Fade in

    return (
      <div className="relative h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full">
          <motion.div
            id="about-section"
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center px-[5em]"
            style={{
              opacity: opacity,
              background: `
                radial-gradient(circle at top left, #0F0F0F, #1C1C1C 40%, #0F0F0F 100%),
                url('https://www.transparenttextures.com/patterns/asfalt-light.png')
              `,
            }}
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg row-span-2"
                style={{
                  x: slideInFromLeft,
                  opacity: fadeIn,
                }}
              >
                <img src={vicios5} className="w-full h-full object-cover" />
                <motion.div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold">Fun Fact about</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg"
                style={{
                  y: slideInFromTop,
                  opacity: 1,
                }}
              >
                <img
                  src={vicios4}
                  className="w-full h-full object-cover aspect-square"
                  style={{
                    maxHeight: "500px",
                  }}
                />
                <motion.div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold">Fun Fact about</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg"
                style={{
                  x: slideInFromRight,
                  opacity: fadeIn,
                }}
              >
                <img
                  src={vicios3}
                  className="w-full h-full object-cover aspect-square"
                  style={{
                    maxHeight: "500px",
                  }}
                />
                <motion.div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold">Fun Fact about</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg col-span-2"
                style={{
                  y: slideInFromBottom,
                  opacity: 1,
                }}
              >
                <img
                  src={vicios1}
                  className="w-full h-full object-cover aspect-[16/9]"
                  style={{
                    maxHeight: "500px",
                  }}
                />
                <motion.div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold">Fun Fact about</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Bio Section */}
            <motion.div
              className="mt-16 text-center"
              style={{
                opacity: textOpacity,
                translateY: translateY,
              }}
            >
              <h2 className="text-4xl font-bold text-white">Our Story</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                This is where you can add a compelling bio or description about
                your project, team, or story. Engage the user with meaningful
                text that complements the interactive visuals.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

export default AboutSection;
