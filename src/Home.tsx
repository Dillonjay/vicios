import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-scroll";
import AboutSection from "./About";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Single panel animation (expands from the middle to cover the screen)
  const panelWidth = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);

  // Fade-in text opacity
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const singleTextOpacity = useTransform(scrollYProgress, [0.23, 0.28], [0, 1]);
  const singleTextTranslateY = useTransform(
    scrollYProgress,
    [0.23, 0.28],
    [120, 90]
  );

  const underneathOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);
  const underneathScale = useTransform(
    scrollYProgress,
    [0.06, 0.2],
    [0.7, 1.3]
  );

  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0.2, 1] // Adjust the second value to control how dark the image gets
  );

  // Fade-out the background image as the panel covers it.
  // Figure this piece out. It's not exactly what I want.
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.2], [1, 0]);

  const blueContainerOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.38],
    [0, 1]
  );
  const blueContainerTranslateY = useTransform(
    scrollYProgress,
    [0.38, 0.42],
    [50, 0]
  );

  const aboutRef = useRef(null);
  const musicRef = useRef(null);
  const contactRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: false });
  const isMusicInView = useInView(musicRef, { once: false });
  const isContactInView = useInView(contactRef, {
    once: false,
  });

  const insetShadow = useTransform(
    scrollYProgress,
    [0, 0.2], // Adjust the range based on scroll
    [
      "inset 0px 0px 0px rgba(0, 0, 0, 0)",
      "inset 0px 0px 30px rgba(0, 0, 0, 0.7)",
    ]
  );

  const panelRotation = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["5deg", "0deg"]
  );
  const panelScale = useTransform(scrollYProgress, [0, 0.2], [1.2, 1]);

  return (
    <div className="relative  w-full bg-black">
      {/* De hecho, this can be sticky until the scroll position is somewhere or until something is no longer in view or just comes into view */}
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
              The story
            </Link>
          </li>
          <li>
            <Link
              to="music-section"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-blue-500"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="contact-section"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-blue-500"
            >
              Reach out
            </Link>
          </li>
        </ul>
      </nav>

      <div className="relative h-[250vh] w-full bg-black">
        {/* Landing Section with Sliding Panel */}
        <div className="sticky top-0 h-screen w-full bg-center bg-cover flex justify-center bg-[url('./assets/vicios-hero.jpeg')]">
          {/* Background Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{ opacity: darkOverlayOpacity }}
          />

          {/* Sliding Black Panel */}
          <motion.div
            className="absolute top-0 h-full flex flex-col justify-center items-center bg-black"
            style={{
              width: panelWidth, // Sliding animation tied to panelWidth
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
              <button
                style={{
                  marginTop: "16px",
                  background: "#5A84E6",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "12px 24px",
                  border: "none",
                  height: "45px",
                  width: "150px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#9DBFF9";
                  e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#5A84E6";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
                onMouseDown={(e) => {
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Play
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection
        scrollYProgress={scrollYProgress}
        opacity={blueContainerOpacity}
        textOpacity={textOpacity}
        translateY={blueContainerTranslateY}
      />

      {/* Band Images */}
      <div
        id="music-section"
        ref={musicRef}
        className="h-screen bg-black flex flex-col gap-10 items-center justify-center"
        style={{
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
        <h2 className="text-xl text-white">
          Have PROJECT or something FALL In. It also might be cool to associate
          the back of the art cover for the projects section maybe?
        </h2>
        <motion.div
          className="w-2/3 text-center border border-gray-700 p-6 text-white flex"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="bg-center bg-cover bg-[url('./assets/cierto-cover.jpeg')] z-40"
            style={{
              width: "300px",
              height: "300px",

              boxShadow: "0 0 40px -3px rgba(300, 300, 300, 0.7)",
            }}
          />
          <h3 className="text-2xl font-bold">Band Member 1</h3>
          <p>Placeholder for band member description or image.</p>
        </motion.div>

        <motion.div
          className="w-2/3 text-center border border-gray-700 p-6 text-white"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold">Band Member 2</h3>
          <p>Placeholder for band member description or image.</p>
        </motion.div>
      </div>
      {/* Contact Section */}
      <div
        id="contact-section"
        className="h-screen bg-gray-700 flex items-center justify-center"
      >
        <motion.h2
          className="text-6xl font-bold"
          initial={{ color: "white" }}
          whileInView={{ color: "#32CD32" }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h2>
      </div>
    </div>
  );
};

export default Home;
