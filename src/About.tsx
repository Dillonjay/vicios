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
      [0.15, 0.4],
      [-800, 0]
    );
    const slideInFromRight = useTransform(
      scrollYProgress,
      [0.15, 0.4],
      [800, 0]
    );
    const slideInFromTop = useTransform(
      scrollYProgress,
      [0.25, 0.5],
      [-200, 0]
    );
    const slideInFromBottom = useTransform(
      scrollYProgress,
      [0.25, 0.5],
      [200, 0]
    );
    const fadeIn = useTransform(scrollYProgress, [0.29, 0.52], [0, 1]);

    // Spotlight/dimming effect
    const fadeOtherImages = useTransform(
      scrollYProgress,
      [0.5, 0.58],
      [1, 0.1]
    );

    // Box-shadow for spotlight effect
    const boxShadowIntensity = useTransform(
      scrollYProgress,
      [0.5, 0.6],
      [
        "0px 0px 0px 0px rgba(0,0,0,0)",
        "0px 0px 90px 10px rgba(255,255,255,0.8)",
      ]
    );

    const scaleImage = useTransform(scrollYProgress, [0.58, 0.63], [1, 1.3]);
    const slideImageSlightly = useTransform(
      scrollYProgress,
      [0.5, 0.58],
      [0, -150]
    );

    const spotlightSize = "10%"; // Smaller size for a tighter circle
    // const spotlightOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
    const spotlightPosition = useTransform(
      scrollYProgress,
      [0.5, 0.55],
      ["50% 50%", "100% 100%"]
    ); // From center to the bottom-right

    console.log("scrollYProgress", scrollYProgress.get());
    console.log("HELLO!!!!");
    return (
      <div className="relative h-[220vh] w-full">
        <div className="sticky top-0 h-screen w-full">
          <motion.div
            id="about-section"
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center px-[5em] bg-center bg-cover bg-no-repeat"
            style={{
              opacity: opacity,
              backgroundImage: `
                radial-gradient(circle at top left, #0F0F0F, #1C1C1C 40%, #0F0F0F 100%),
                url('https://www.transparenttextures.com/patterns/asfalt-light.png')
              `,
            }}
          >
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
                className="relative overflow-hidden rounded-lg shadow-lg max-h-[30em]"
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
                className="relative overflow-hidden rounded-lg shadow-lg max-h-[30em]"
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
                className="relative overflow-hidden rounded-lg shadow-lg col-span-2 max-h-[30em]"
                style={{
                  y: slideInFromBottom,
                  opacity: fadeIn,
                  scale: scaleImage,
                  boxShadow: boxShadowIntensity,
                  x: slideImageSlightly,
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
                    translateY: useTransform(
                      scrollYProgress,
                      [0.58, 0.63],
                      [150, 0]
                    ),
                    translateX: useTransform(
                      scrollYProgress,
                      [0.66, 0.77],
                      [0, 750]
                    ),
                    opacity: useTransform(
                      scrollYProgress,
                      [0.58, 0.63],
                      [0, 1]
                    ),
                  }}
                >
                  <motion.div
                    style={{
                      // Fade out the text as we slide out the little black box thing.
                      opacity: useTransform(
                        scrollYProgress,
                        [0.65, 0.73],
                        [1, 0]
                      ),
                    }}
                  >
                    <h2 className="text-xl font-bold">About Us</h2>
                    <p className="text-sm mt-2">
                      Discover more about our journey, values, and the stories
                      that shape who we are.
                    </p>
                    <p className="text-sm mt-2">
                      Discover more about our journey, values, and the stories
                      that shape who we are.
                    </p>
                  </motion.div>
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
