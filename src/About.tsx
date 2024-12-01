import { forwardRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

import vicios1 from "./assets/vicios-1.jpeg";
import vicios3 from "./assets/vicios-3.jpeg";
import vicios4 from "./assets/vicios-4.jpeg";
import vicios5 from "./assets/vicios-5.jpeg";

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ scrollYProgress }, ref) => {
    // Maybe this is just an overlay.
    const opacity = useTransform(scrollYProgress, [0.468, 0.53], [0, 1]);

    // Image animations
    const slideInFromLeft = useTransform(
      scrollYProgress,
      [0.4, 0.55], // These stay the same
      [-800, 0]
    );
    const slideInFromRight = useTransform(
      scrollYProgress,
      [0.4, 0.54], // These stay the same
      [800, 0]
    );
    const slideInFromTop = useTransform(
      scrollYProgress,
      [0.45, 0.57], // These also stay the same.
      [-200, 0]
    );
    const slideInFromBottom = useTransform(
      scrollYProgress,
      [0.45, 0.57], // These also stay the same.
      [200, 0]
    );

    const scale1 = useTransform(scrollYProgress, [0.38, 0.55], [3.1, 1]);

    const scale2 = useTransform(scrollYProgress, [0.38, 0.54], [3.2, 1]);

    const scale3 = useTransform(scrollYProgress, [0.38, 0.53], [3, 1]);

    const fadeIn = useTransform(scrollYProgress, [0.29, 0.52], [0, 1]);

    // Spotlight/dimming effect
    const fadeOtherImages = useTransform(
      scrollYProgress,
      [0.58, 0.69],
      [1, 0.1]
    );

    // Box-shadow for spotlight effect
    const boxShadowIntensity = useTransform(
      scrollYProgress,
      [0.57, 0.69],
      [
        "0px 0px 0px 0px rgba(0,0,0,0)",
        "0px 0px 20px 8px rgba(255,255,255,0.6)",
      ]
    );

    const scaleImage = useTransform(scrollYProgress, [0.58, 0.71], [1, 1.3]);
    const slideImageSlightly = useTransform(
      scrollYProgress,
      [0.58, 0.71],
      [0, -150]
    );

    const slidingPanelOpacity = useTransform(
      scrollYProgress,
      [0.55, 0.7],
      [0, 0.9]
    );
    const slidingPanelTranslateY = useTransform(
      scrollYProgress,
      [0.55, 0.7],
      [150, 0]
    );
    const slidingPanelTranslateX = useTransform(
      scrollYProgress,
      [0.73, 0.84],
      [0, 750]
    );

    const slidingPanelExitTextOpacity = useTransform(
      scrollYProgress,
      [0.73, 0.84],
      [1, 0]
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
      <div className="relative h-[220vh]">
        <div className="sticky top-0 h-screen ">
          <motion.div
            id="about-section"
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center px-[5em] bg-center bg-cover bg-no-repeat"
            style={{
              opacity: opacity,
              backgroundImage: `
              radial-gradient(circle at top left, #0A0A0A, #181818 40%, #0A0A0A 100%),
              url('https://www.transparenttextures.com/patterns/asfalt-light.png')
            `,
            }}
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 relative z-20">
              <motion.div
                className="relative overflow-hidden shadow-lg row-span-2"
                style={{
                  x: slideInFromLeft,
                  scale: scale1,
                  opacity: fadeOtherImages,
                }}
              >
                <img src={vicios5} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="relative overflow-hidden shadow-lg max-h-[20em]"
                style={{
                  y: slideInFromTop,
                  scale: scale3,
                  opacity: fadeOtherImages,
                }}
              >
                <img
                  src={vicios4}
                  className="w-full h-full object-cover aspect-square"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden shadow-lg max-h-[20em]"
                style={{
                  x: slideInFromRight,
                  opacity: fadeOtherImages,
                  scale: scale2,
                }}
              >
                <img
                  src={vicios3}
                  className="w-full h-full object-cover aspect-square"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden  shadow-lg col-span-2 max-h-[20em]"
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
                  className="absolute bottom-0 left-0 w-full bg-opacity-90 text-white p-6 rounded-t-lg shadow-lg"
                  style={{
                    background: "#0F0F0F",
                    translateY: slidingPanelTranslateY,
                    translateX: slidingPanelTranslateX,
                    opacity: slidingPanelOpacity,
                  }}
                >
                  <motion.div
                    style={{
                      // Fade out the text as we slide out the little black box thing.
                      opacity: slidingPanelExitTextOpacity,
                    }}
                  >
                    <h2 className="text-xl font-bold">About Us</h2>
                    <p className="text-sm mt-2 font-light">
                      Blah Blah Blah Blah fucking Blah blah blah Fucking blah.
                      Blah blah blfucking balwwwwh
                    </p>
                    <p className="text-sm mt-2 font-light">
                      Blah Blah Blah Blah fucking Blah blah blah Fucking blah.
                      Blah blah blfucking balwwwwh. Y ma balch pinche balh balch
                      puto.
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
