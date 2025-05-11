"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";

import { IntlProvider } from "react-intl";
import enMessages from "./locales/en.json";
import esMessages from "./locales/es.json";
import { Languages } from "./types.ts";

import { LanguageToggle } from "./components/LanguageToggle/index.ts";
import LoadingSpinner from "./components/LoadingSpinner";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

// Lazy load the Home component
const Home = lazy(() => import("./Home"));

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  es: esMessages,
};

const App = () => {
  const [language, setLanguage] = useState<Languages>(Languages.EN);
  const { scrollYProgress } = useScroll();
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
  }, []);
  // Shadow status for debug display
  const shadowStatus = useTransform(
    scrollYProgress,
    [0.23, 0.24, 0.34, 0.4, 0.41],
    ["OFF", "ON", "FADING", "OFF", "OFF"]
  );

  // Debug value for showing the scroll progress
  const debugScrollValue = useTransform(
    scrollYProgress,
    (value) => `${(value * 100).toFixed(1)}%`
  );

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {/* Debug Element */}
      <div className="fixed top-14 right-14 bg-black text-white p-3 z-[100] text-sm rounded border-2 border-white">
        <motion.p className="font-bold">{debugScrollValue}</motion.p>
        <div className="mt-2 pt-2 border-t border-gray-500">
          <p className="text-xs">
            Shadow:{" "}
            <motion.span className="text-green-500">{shadowStatus}</motion.span>
          </p>
          <p className="text-xs mt-1">Fades: 34%-40%</p>
        </div>
      </div>
      <div className="fixed top-6 right-6 z-50">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-black">
            <LoadingSpinner size="large" />
          </div>
        }
      >
        <Home />
      </Suspense>
    </IntlProvider>
  );
};

export default App;
