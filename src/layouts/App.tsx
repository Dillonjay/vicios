"use client";
import { useEffect, lazy, Suspense } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../config/locales/en.json";
import esMessages from "../config/locales/es.json";

import { LanguageToggle } from "../components/LanguageToggle/index";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../hooks";
import { setupSmoothScroll } from "../utils";

// Lazy load the Home component
const Home = lazy(() => import("../pages/Home"));

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  es: esMessages,
};

const App = () => {
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    // Setup smooth scroll using the utility function
    const cleanupScroll = setupSmoothScroll({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    return () => {
      cleanupScroll();
    };
  }, []);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <div className="fixed top-6 right-6 z-50">
        <LanguageToggle language={language} setLanguage={changeLanguage} />
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
