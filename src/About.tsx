import { forwardRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

import vicios1 from "./assets/vicios-1.jpeg";
import vicios3 from "./assets/vicios-3.jpeg";
import vicios4 from "./assets/vicios-4.jpeg";
import vicios5 from "./assets/vicios-5.jpeg";
import { FormattedMessage } from "react-intl";
import { messages } from "./storyMessages";

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
    const storyOpacity = useTransform(scrollYProgress, [0.73, 0.78], [1, 0]);
    const storyTranslateY = useTransform(
      scrollYProgress,
      [0.73, 0.75],
      [0, 65]
    );

    return (
      <div className="relative h-[220vh]">
        <div className="sticky top-0 h-screen ">
          <div className="absolute bottom-0 w-full flex justify-end z-30">
            <motion.div
              className="text-white text-7xl font-black uppercase tracking-wide"
              style={{
                opacity: storyOpacity,
                translateY: storyTranslateY,
              }}
              transition={{ duration: 0.5 }}
            >
              OUR STORY
            </motion.div>
          </div>
          <motion.div
            id="story-section"
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center px-[5em] bg-center bg-cover bg-no-repeat overflow-x-hidden"
            style={{
              opacity: opacity,
              backgroundImage: `
                  radial-gradient(
                  circle,
                  #0A0A0A 0%,
                  #181818 100%
              )`,
            }}
          >
            {/* Image Grid */}
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 relative z-20">
              <motion.div
                className="group relative overflow-hidden shadow-lg row-span-2"
                style={{
                  x: slideInFromLeft,
                  scale: scale1,
                  opacity: fadeOtherImages,
                }}
                whileHover={{
                  transition: { duration: 0.5 },
                  boxShadow: "0px 0px 6px 1px rgba(255,255,255,0.2)",
                }}
              >
                <motion.img
                  src={vicios5}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.07,
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </motion.div>

              <motion.div
                className="group relative overflow-hidden shadow-lg max-h-[20em]"
                style={{
                  y: slideInFromTop,
                  scale: scale3,
                  opacity: fadeOtherImages,
                }}
                whileHover={{
                  transition: { duration: 0.5 },
                  boxShadow: "0px 0px 6px 1px rgba(255,255,255,0.2)",
                }}
              >
                <motion.img
                  src={vicios4}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.07,
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
              <motion.div
                className="group relative overflow-hidden shadow-lg max-h-[20em]"
                style={{
                  x: slideInFromRight,
                  opacity: fadeOtherImages,
                  scale: scale2,
                }}
                whileHover={{
                  transition: { duration: 0.5 },
                  boxShadow: "0px 0px 6px 1px rgba(255,255,255,0.2)",
                }}
              >
                <motion.img
                  src={vicios3}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.07,
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
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
                  className="absolute bottom-0 left-0 w-full bg-opacity-90 text-white p-6 rounded-t-lg "
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
                    <h2 className="text-xl font-bold">
                      <FormattedMessage {...messages.title} />
                    </h2>
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
