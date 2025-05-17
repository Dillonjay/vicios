import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import AboutSection from "../sections/About";
import ProjectSection from "../sections/Project";
import ContactSection from "../sections/Connect";
import { HeroSection } from "../components/HeroSection";
import { AlbumShowcase } from "../components/AlbumShowcase";

import complacentCover from "/images/complacent-lust-cover.jpeg";

const Home = () => {
  const { scrollYProgress } = useScroll();

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
        <HeroSection scrollYProgress={scrollYProgress} homeRef={homeRef} />

        <AlbumShowcase
          scrollYProgress={scrollYProgress}
          albumCover={complacentCover}
          albumTitle="Complacent Lust"
          artistName="Vicios Ocultos"
        />

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
