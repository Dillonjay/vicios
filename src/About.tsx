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
    // Image animations
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

    // Panel animation
    const panelTranslateY = useTransform(
      scrollYProgress,
      [0.4, 0.55],
      [100, 0]
    );
    const panelOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

    // Dim other images while the text panel appears
    const fadeOtherImages = useTransform(
      scrollYProgress,
      [0.4, 0.55],
      [1, 0.2]
    );

    // Spotlight effect for the entire page
    const spotlightOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

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
            {/* Full-Screen Spotlight Effect */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                opacity: spotlightOpacity,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 15%, rgba(0,0,0,0.9) 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 relative z-20">
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg row-span-2"
                style={{
                  x: slideInFromLeft,
                  opacity: fadeOtherImages,
                }}
              >
                <img src={vicios5} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg"
                style={{
                  y: slideInFromTop,
                  opacity: fadeOtherImages,
                }}
              >
                <img
                  src={vicios4}
                  className="w-full h-full object-cover aspect-square"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg"
                style={{
                  x: slideInFromRight,
                  opacity: fadeOtherImages,
                }}
              >
                <img
                  src={vicios3}
                  className="w-full h-full object-cover aspect-square"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg col-span-2"
                style={{
                  y: slideInFromBottom,
                  opacity: fadeIn,
                }}
              >
                <img
                  src={vicios1}
                  className="w-full h-full object-cover aspect-[16/9]"
                />
                {/* Sliding Panel */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-white p-6 rounded-t-lg shadow-lg"
                  style={{
                    translateY: panelTranslateY,
                    opacity: panelOpacity,
                  }}
                >
                  <h2 className="text-xl font-bold">About Us</h2>
                  <p className="text-sm mt-2">
                    Discover more about our journey, values, and the stories
                    that shape who we are.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

export default AboutSection;
