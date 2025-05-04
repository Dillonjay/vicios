"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";

import { IntlProvider } from "react-intl";
import enMessages from "./locales/en.json";
import esMessages from "./locales/es.json";
import { Languages } from "./types.ts";

import { LanguageToggle } from "./components/LanguageToggle/index.ts";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load the Home component
const Home = lazy(() => import("./Home"));

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  es: esMessages,
};

const App = () => {
  const [language, setLanguage] = useState<Languages>(Languages.EN);

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

  return (
    <IntlProvider locale={language} messages={messages[language]}>
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
