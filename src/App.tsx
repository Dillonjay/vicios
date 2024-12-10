import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./Home";

import { IntlProvider } from "react-intl";
import enMessages from "./locales/en.json";
import esMessages from "./locales/es.json";
import { Languages } from "./types.ts";

import { LanguageToggle } from "./LanguageToggle";

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
      <div className="fixed top-6 right-6 z-40">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      <Home />
    </IntlProvider>
  );
};

export default App;
