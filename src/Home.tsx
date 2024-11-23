import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Split animation values
  const leftPanelWidth = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const rightPanelWidth = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", "50%"]
  );

  // Fade-in text opacity
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <div className="relative h-[300vh] w-full bg-black">
      {/* Landing Section with Fullscreen Background Image */}
      <div className="relative h-screen w-full bg-center bg-cover bg-[url('./assets/vicios-hero.jpeg')]">
        <div className="absolute inset-0 bg-blackOverlay flex items-center justify-center">
          <h1 className="sticky text-white text-6xl font-bold">
            Vicios Ocultos
          </h1>
        </div>
      </div>

      {/* Split Panels */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-black z-10"
        style={{ width: leftPanelWidth }}
      ></motion.div>
      <motion.div
        className="absolute top-0 right-0 bottom-0 bg-black z-10"
        style={{ width: rightPanelWidth }}
      ></motion.div>

      {/* Fade-in Text */}
      <motion.div
        className="absolute top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ opacity: textOpacity }}
      >
        <h2 className="text-6xl font-bold text-white">Vicios Ocultos</h2>
      </motion.div>

      {/* Black Screen */}
      <div className="relative h-screen w-full bg-black flex items-center justify-center">
        <motion.h2
          className="text-6xl font-bold text-white"
          style={{ opacity: textOpacity }}
        >
          About
        </motion.h2>
      </div>

      {/* Band Images */}
      <div className="h-screen bg-black flex flex-col gap-10 items-center justify-center">
        <motion.img
          className="w-1/3"
          src="./assets/band-image1.jpg"
          alt="Band Member"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.img
          className="w-1/3"
          src="./assets/band-image2.jpg"
          alt="Band Member"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default Home;
