import { motion } from "framer-motion";
import { useCallback, useState, useMemo } from "react";
import classNames from "classnames";
import { Languages } from "../../types.ts";

const TOGGLE_INITIAL_STYLE = {
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
};

const TOGGLE_HOVER_STYLE = {
  width: "12rem",
  height: "4rem",
  borderRadius: "8px",
};

const TOGGLE_TRANSITION = {
  delay: 0.1,
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const KNOB_INITIAL_STYLE = {
  top: 0,
  left: 0,
};

const KNOB_TRANSITION = {
  type: "easeInOut",
  duration: 0.2,
};

const BG_TRANSITION_DURATION = {
  duration: 0.5,
};
const TEXT_TRANSITION_DURATION = {
  duration: 0.2,
};

interface LanguageToggleProps {
  setLanguage: React.Dispatch<React.SetStateAction<Languages>>;
  language: Languages;
}

const LanguageToggle = ({ setLanguage, language }: LanguageToggleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const setHovered = useCallback(() => {
    setIsHovered(true);
  }, [setIsHovered]);
  const setNotHovered = useCallback(() => {
    setIsHovered(false);
  }, [setIsHovered]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) =>
      prev === Languages.EN ? Languages.ES : Languages.EN
    );
  }, [setLanguage]);

  const toggleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLanguage();
      }
    },
    [toggleLanguage]
  );

  const bgImageOverlayClass = useMemo(
    () =>
      classNames("absolute inset-0 bg-black", {
        "bg-opacity-40": isHovered,
      }),
    [isHovered]
  );

  const labelClass = useMemo(
    () =>
      classNames("z-10 font-semibold", {
        "text-white": isHovered,
        "text-black": !isHovered,
      }),
    [isHovered]
  );

  return (
    <motion.button
      // Second tab index to assume that the language toggle is the second focusable element after the nav
      tabIndex={2}
      onClick={toggleLanguage}
      onMouseEnter={setHovered}
      onMouseLeave={setNotHovered}
      onKeyDown={toggleKeyDown}
      className="relative flex justify-between items-center p-5 shadow-white-md cursor-pointer overflow-hidden"
      aria-label={
        language === Languages.EN ? "Cambiar a Español" : "Switch to English"
      }
      initial={TOGGLE_INITIAL_STYLE}
      whileHover={TOGGLE_HOVER_STYLE}
      transition={TOGGLE_TRANSITION}
    >
      {/* Background svg's and overlays */}
      <motion.div
        className="absolute inset-0 bg-cover bg-[150%] aspect-w-16 aspect-h-9 bg-[url('./assets/mountain.svg')]"
        animate={{ opacity: language === Languages.EN ? 1 : 0 }}
        transition={BG_TRANSITION_DURATION}
      >
        <div className={bgImageOverlayClass} />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-cover bg-[150%] aspect-w-16 aspect-h-9 bg-[url('./assets/canyon.svg')]"
        animate={{ opacity: language === Languages.ES ? 1 : 0 }}
        transition={BG_TRANSITION_DURATION}
      >
        <div className={bgImageOverlayClass} />
      </motion.div>
      {/* Text labels */}
      <motion.span
        className={labelClass}
        animate={{ opacity: language === Languages.EN ? 0 : 1 }}
        transition={TEXT_TRANSITION_DURATION}
      >
        English
      </motion.span>
      <motion.span
        className={labelClass}
        animate={{ opacity: language === Languages.ES ? 0 : 1 }}
        transition={TEXT_TRANSITION_DURATION}
      >
        Español
      </motion.span>
      <motion.div
        className="absolute rounded-[8px] text-3xl shadow-lg flex items-center justify-center z-20 "
        initial={KNOB_INITIAL_STYLE}
        animate={{
          width: isHovered ? "3rem" : "4rem",
          height: isHovered ? "3rem" : "4rem",
          left:
            !isHovered && language === Languages.ES
              ? "calc(100% - 64px)"
              : !isHovered && language === Languages.EN
              ? 0
              : language === "en"
              ? 6
              : "calc(100% - 55px)",
          top: !isHovered ? 0 : "0.5rem",
          background: isHovered
            ? "linear-gradient(to bottom,#f3ec78, #af4261)"
            : "transparent",
        }}
        transition={KNOB_TRANSITION}
      >
        {language === Languages.EN ? "🇺🇸" : "🇲🇽"}
      </motion.div>
    </motion.button>
  );
};

export { LanguageToggle };
