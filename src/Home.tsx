import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-scroll";
import AboutSection from "./About";
import ProjectSection from "./Project";
import ContactSection from "./Contact";

import {
  FaFacebook,
  FaInstagram,
  FaMailchimp,
  FaYoutube,
} from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // First ocultos dissapear opacity:
  const ocultosOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const ocultosYScale = useTransform(scrollYProgress, [0, 0.05], [0, -200]);
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
              className="text-7xl font-black text-white z-20"
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
                className="bg-center bg-cover bg-[url('./assets/cierto-cover.jpeg')] z-40"
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
                className="text-center text-white z-50 w-full"
                style={{
                  opacity: singleTextOpacity,
                  translateY: singleTextTranslateY,
                }}
              >
                <h2 className="text-2xl font-bold">
                  "Vicios Ocultos" - Lo Cierto
                </h2>
                <p className="mt-4">
                  Listen now on{" "}
                  <a href="spotify-link" className="underline">
                    Spotify
                  </a>
                </p>
                <motion.button
                  className="mt-8 px-10 py-4 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg"
                  whileHover={{ scale: 1.1 }} // Hover effect
                  whileTap={{ scale: 0.95 }} // Tap effect
                >
                  Play
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* About Section */}
        <AboutSection scrollYProgress={scrollYProgress} ref={aboutRef} />
        <ProjectSection ref={musicRef} scrollYProgress={scrollYProgress} />
        {/* Contact Section */}
        {/* <div
        id="contact-section"
        className="h-screen bg-gray-700 flex flex-col"
        style={{
          //     // opacity: opacity,
          backgroundImage: `
          linear-gradient(to top, #2B2B4F 10%, #1C1C1C 40%, #0F0F0F 100%),
          url('https://www.transparenttextures.com/patterns/asfalt-light.png')
      `,
        }}
      >
        <motion.h1
          className="text-9xl font-bold"
          initial={{ color: "white" }}
          whileInView={{ color: "#32CD32" }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h1>
      </div> */}
        {/* <motion.div className="h-screen w-full bg-center bg-cover flex justify-center bg-[url('./assets/vicios-back-cover.png')]"></motion.div> */}
        {/*  bg-center bg-cover bg-no-repeat bg-[url('./assets/vicios-back-cover.png')] */}
        {/* Contact Section */}\{/* Include the ref */}
        <ContactSection scrollYProgress={scrollYProgress} />
        {/* <motion.div
          id="contact-section"
          ref={contactRef}
          className="h-screen w-full flex items-center justify-center bg-black"
          style={{
            opacity: useTransform(scrollYProgress, [0.95, 1], [0.1, 1]), // Gradual black overlay fade-out
          }}
        >
          <div className="flex flex-col">
            <motion.h1
              className="text-9xl font-black text-white"
              style={{
                opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]), // Fade-in
                scale: useTransform(scrollYProgress, [0.9, 1], [0.7, 1.5]), // Scale up
                translateY: useTransform(scrollYProgress, [0.9, 1], [100, 0]), // Float in from below
              }}
            >
              CONNECT
            </motion.h1>
            <motion.div
              className="flex mt-9 justify-between"
              style={{
                opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]),
              }}
            >
              <FaInstagram color="white" size="4em" />
              <FaFacebook color="white" size="4em" />
              <FaYoutube color="white" size="4em" />
              <FaMailchimp color="white" size="4em" />
            </motion.div>
          </div> */}
        {/* Contact Button */}
        {/* <motion.button
            className="mt-24 px-10 py-4 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold rounded-lg shadow-lg"
            style={{
              opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]), // Fade-in
              translateY: useTransform(scrollYProgress, [0.95, 1], [50, 0]), // Float in slightly later than the title
            }}
            whileHover={{ scale: 1.1 }} // Hover effect
            whileTap={{ scale: 0.95 }} // Tap effect
            onClick={() => (window.location.href = "/contact")} // Redirect to Contact Page
          >
            Contact Us
          </motion.button>
          <div>
            <h2 className="text-4xl font-extrabold mb-2">Contact Us</h2>
            <p className="text-gray-400 text-lg">
              Prefer to email us directly? Drop us a line at:
            </p>
            <a
              href="mailto:example@email.com"
              className="block mt-2 text-blue-400 text-xl underline hover:text-blue-500"
            >
              example@email.com
            </a>
          </div> 
                  </motion.div>
          */}
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
