import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Home from "./Home";

import Contact from "./Contact";

const TransitionOverlay = ({ isExiting }) => {
  if (!isExiting) return null; // Render only during transitions

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{
        duration: 1.2, // Time for the "closing" and "opening"
        ease: "easeInOut",
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        transformOrigin: "top", // Animates top-to-bottom
        zIndex: 50,
      }}
    />
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track first load

  useEffect(() => {
    // Disable initial load state after the first render
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setIsExiting(false)} // Reset state after transition
      >
        <Routes
          location={location}
          key={location.pathname}
          onEnterStart={() => setIsExiting(true)} // Trigger overlay on route change
        >
          <Route path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>

      {/* Only render the overlay during transitions and skip on initial load */}
      {!isInitialLoad && <TransitionOverlay isExiting={isExiting} />}
    </>
  );
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]); // Reinitialize Lenis when route changes

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
