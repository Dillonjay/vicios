import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Navigation } from "./components/Navigation/Navigation";
import AboutSection from "./About";
import ProjectSection from "./Project";
import ContactSection from "./Connect";

import { FaApple, FaYoutube, FaSpotify } from "react-icons/fa6";
import { MusicButton } from "./MusicButton";
import complacentCover from "/assets/complacent-lust-cover.jpeg";
import { SPOTIFY, YOUTUBE, APPLE_MUSIC } from "./constants";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // First ocultos dissapear opacity:
  const ocultosOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  // Dark overlay of "hero open up image"
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.34],
    [0.58, 1]
  );

  // Single panel animation (expands from the middle to cover the screen)
  const panelWidth = useTransform(
    scrollYProgress,
    [0.21, 0.34],
    ["0%", "100%"]
  );

  const underneathOpacity = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);

  // Initial scale for the container (stops at 34%)
  const initialScale = useTransform(scrollYProgress, [0.24, 0.34], [0.7, 1.3]);

  // Scale for inner content that starts at 34% when shadow fades
  const innerScale = useTransform(scrollYProgress, [0.34, 0.4], [1, 1.12]);

  // 3D perspective transform for the album cover
  const coverRotateX = useTransform(
    scrollYProgress,
    [0.2, 0.28],
    ["5deg", "0deg"]
  );

  const coverDepth = useTransform(
    scrollYProgress,
    [0.22, 0.28],
    ["-15px", "0px"]
  );

  // The spotify piece that will just have links - synchronized with inner image zoom
  const singleTextOpacity = useTransform(scrollYProgress, [0.34, 0.4], [0, 1]);
  const singleTextTranslateY = useTransform(
    scrollYProgress,
    [0.34, 0.4],
    [120, 90]
  );

  // Shadow transition with just three states: intense, less intense, then none
  const coverShadow = useTransform(
    scrollYProgress,
    [0.24, 0.34, 0.37, 0.4],
    [
      "inset 0 0 25px 10px rgba(0, 0, 0, 0.8), inset 0 0 8px 2px rgba(255, 255, 255, 0.15)",
      "inset 0 0 25px 10px rgba(0, 0, 0, 0.8), inset 0 0 8px 2px rgba(255, 255, 255, 0.15)",
      "inset 0 0 15px 3px rgba(0, 0, 0, 0.6), inset 0 0 6px 1px rgba(255, 255, 255, 0.10)",
      "none",
    ]
  );

  const homeRef = useRef(null);
  const storyRef = useRef(null);
  const projectRef = useRef(null);
  const connectRef = useRef(null);

  const isHomeInView = useInView(homeRef);
  const isStoryInView = useInView(storyRef, { amount: 0.5 });
  const isProjectInView = useInView(projectRef, { amount: 0.5 });
  const isConnectInView = useInView(connectRef, {
    amount: 0.5,
  });

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-black"
    >
      <div className="relative w-full bg-black">
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
        <div className="relative h-[250vh] w-full bg-black">
          {/* Landing Section */}
          <motion.div className="sticky top-0 h-screen w-full flex justify-center bg-cover bg-no-repeat bg-[url('/assets/vicios-hero.jpeg')] bg-center">
            {/* Glow Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full glow-overlay"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
              }}
            ></motion.div>

            {/* Background Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-black z-20"
              style={{ opacity: darkOverlayOpacity }}
            />

            {/* Sliding Black Panel */}
            <motion.div
              className="absolute top-0 h-full flex flex-col justify-center items-center bg-black z-30"
              style={{
                width: panelWidth,
                boxShadow: "inset 0px 0px 30px rgba(0, 0, 0, 0.7)",
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
              {/* Album Cover with Subtle Inset Effect - Container */}
              <motion.div
                className="bg-center bg-cover w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] lg:w-[30vw] lg:h-[30vw] max-w-[30vh] max-h-[30vh] overflow-hidden relative"
                style={{
                  opacity: underneathOpacity,
                  scale: initialScale,
                  boxShadow: coverShadow,
                  rotateX: coverRotateX,
                  translateZ: coverDepth,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  transformOrigin: "center center",
                }}
              >
                {/* Inner image that zooms as shadow fades */}
                <motion.div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${complacentCover})`,
                    scale: innerScale,
                    transformOrigin: "center center",
                  }}
                />
              </motion.div>

              {/* Supporting Text */}
              <motion.div
                className="text-center text-white mt-8"
                style={{
                  opacity: singleTextOpacity,
                  translateY: singleTextTranslateY,
                }}
              >
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl">
                  <span className="font-extralight tracking-wide uppercase">
                    Vicios&nbsp;Ocultos
                  </span>
                  <span className="opacity-60 mx-1">—</span>
                  <span className="font-extrabold">Complacent Lust</span>
                </h2>

                <div className="flex justify-center items-center gap-2 md:gap-0 mt-4">
                  <MusicButton icon={FaSpotify} href={SPOTIFY.complacent} />
                  <MusicButton icon={FaApple} href={APPLE_MUSIC.complacent} />
                  <MusicButton icon={FaYoutube} href={YOUTUBE.complacent} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <AboutSection scrollYProgress={scrollYProgress} ref={storyRef} />
        <ProjectSection ref={projectRef} scrollYProgress={scrollYProgress} />
        <ContactSection ref={connectRef} scrollYProgress={scrollYProgress} />
      </div>
      <Navigation
        isStoryInView={isStoryInView}
        isConnectInView={isConnectInView}
        isProjectInView={isProjectInView}
        isHomeInView={isHomeInView}
      />
    </motion.div>
  );
};

export default Home;
