import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Navigation } from "./components/Navigation/Navigation";
import AboutSection from "./About";
import ProjectSection from "./Project";
import ContactSection from "./Connect";

import { FaApple, FaYoutube, FaSpotify } from "react-icons/fa6";
import { MusicButton } from "./MusicButton";

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
  const underneathScale = useTransform(
    scrollYProgress,
    [0.24, 0.34],
    [0.7, 1.3]
  );

  // The spotify piece that will just have links
  const singleTextOpacity = useTransform(scrollYProgress, [0.34, 0.4], [0, 1]);
  const singleTextTranslateY = useTransform(
    scrollYProgress,
    [0.34, 0.4],
    [120, 90]
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
  // TODO: Home section needs to be a component. This is acting as the home section and the entire page container.
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
          <motion.div className="sticky top-0 h-screen w-full flex justify-center bg-cover bg-no-repeat bg-[url('./assets/vicios-hero.jpeg')] bg-center">
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
              {/* Album Cover */}
              <motion.div
                className="bg-center bg-cover bg-[url('./assets/cierto-cover.jpeg')]"
                style={{
                  opacity: underneathOpacity,
                  scale: underneathScale,
                  width: "60vw",
                  height: "60vw",
                  maxWidth: "30vh",
                  maxHeight: "30vh",
                  boxShadow: "0 0 10px 3px rgba(300, 300, 300, 0.7)",
                }}
              />

              {/* Supporting Text */}
              <motion.div
                className="text-center text-white mt-8"
                style={{
                  opacity: singleTextOpacity,
                  translateY: singleTextTranslateY,
                }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Vicios Ocultos - Lo Cierto
                </h2>
                <div className="flex justify-center items-center gap-2 md:gap-4">
                  <MusicButton
                    icon={FaSpotify}
                    href="https://open.spotify.com/artist/viciososocultos"
                  />
                  <MusicButton
                    icon={FaApple}
                    href="https://music.apple.com/artist/viciososocultos"
                  />
                  <MusicButton
                    icon={FaYoutube}
                    href="https://youtube.com/@viciososocultos"
                  />
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
