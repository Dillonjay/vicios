import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-scroll";
import AboutSection from "./About";
import ProjectSection from "./Project";
import ContactSection from "./Contact";

import { FaApple, FaYoutube, FaSpotify } from "react-icons/fa6";

interface MusicButtonProps {
  icon: any; // The icon component (e.g., FaSpotify, FaApple, etc.)
  href: string; // The URL to link to
}

const MusicButton: React.FC<MusicButtonProps> = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center p-4 rounded-full bg-transparent text-white transition duration-300 ease-in-out 
        hover:text-cyan-400"
    >
      <Icon className="text-3xl group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();

  // First ocultos dissapear opacity:
  const ocultosOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  //Vicios
  const viciosTranslateY = useTransform(
    scrollYProgress,
    [0.054, 0.16],
    [0, 590]
  );

  // Dark overlay of "hero open up image"
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.34],
    [0.2, 1] // Adjust the second value to control how dark the image gets
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

  // Fade-out the background image as the panel covers it.
  // Figure this piece out. It's not exactly what I want.
  // const imageOpacity = useTransform(scrollYProgress, [0.15, 0.2], [1, 0]);

  const aboutRef = useRef(null);
  const musicRef = useRef(null);
  const contactRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: false });
  const isMusicInView = useInView(musicRef, { once: false });
  const isContactInView = useInView(contactRef, {
    once: false,
  });

  // const insetShadow = useTransform(
  //   scrollYProgress,
  //   [0, 0.2], // Adjust the range based on scroll
  //   [
  //     "inset 0px 0px 0px rgba(0, 0, 0, 0)",
  //     "inset 0px 0px 30px rgba(0, 0, 0, 0.7)",
  //   ]
  // );

  // const panelRotation = useTransform(
  //   scrollYProgress,
  //   [0, 0.2],
  //   ["5deg", "0deg"]
  // );
  // const panelScale = useTransform(scrollYProgress, [0, 0.2], [1.2, 1]);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-black"
    >
      <div className="relative  w-full bg-black">
        <Navigation
          isMusicInView={isMusicInView}
          isAboutInView={isAboutInView}
        />
        <motion.div className="w-full h-[150vh] relative bg-black">
          <motion.div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center">
            <motion.h1
              className="text-9xl font-black text-white z-20"
              style={
                {
                  // opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]), // Fade-in
                  // scale: useTransform(scrollYProgress, [0.9, 1], [0.7, 1.5]), // Scale up
                  // translateY: viciosTranslateY, // Try to make this sticky somehow actually
                }
              }
            >
              VICIOS
            </motion.h1>
            <motion.h2
              className="text-7xl font-black text-white"
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
          <motion.div className="sticky top-0 h-screen w-full flex justify-center bg-center bg-cover bg-[url('./assets/vicios-hero.jpeg')]">
            {/* Glow Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full glow-overlay"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]), // Optional fade-out on scroll
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
                  opacity: underneathOpacity, // Album cover fade-in
                  scale: underneathScale, // Album cover zoom-in
                  width: "30vh",
                  height: "30vh",
                  boxShadow: "0 0 40px -3px rgba(300, 300, 300, 0.7)",
                }}
              />

              {/* Supporting Text */}
              <motion.div
                className="text-center text-white"
                style={{
                  opacity: singleTextOpacity,
                  translateY: singleTextTranslateY,
                }}
              >
                <h2 className="text-2xl font-bold">
                  Vicios Ocultos - Lo Cierto
                </h2>
                <div className="flex justify-center items-center gap-1">
                  <MusicButton icon={FaSpotify} href="https://spotify.com" />
                  <MusicButton icon={FaApple} href="https://spotify.com" />
                  <MusicButton icon={FaYoutube} href="https://spotify.com" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* About Section */}
        <AboutSection scrollYProgress={scrollYProgress} ref={aboutRef} />
        <ProjectSection ref={musicRef} scrollYProgress={scrollYProgress} />
        <ContactSection scrollYProgress={scrollYProgress} />
      </div>
    </motion.div>
  );
};

export default Home;

const Navigation = ({ isMusicInView, isAboutInView }) => {
  return (
    <nav className="fixed top-4 left-4 z-50">
      <ul
        className={`flex flex-row gap-16 text-xl font-bold ${
          isMusicInView && !isAboutInView ? "text-white" : "text-blue-300"
        }`}
      >
        <li>
          <Link
            to="about-section"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            Story
          </Link>
        </li>
        <li>
          <Link
            to="music-section"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            Project
          </Link>
        </li>
        <li>
          <Link
            to="contact-section"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            Connection
          </Link>
        </li>
      </ul>
    </nav>
  );
};
