import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-scroll";
import { useIntl } from "react-intl";
import classNames from "classnames";
import { messages } from "./messages";

interface NavigationProps {
  isHomeInView: boolean;
  isStoryInView: boolean;
  isProjectInView: boolean;
  isConnectInView: boolean;
}

enum Sections {
  HOME = "home",
  STORY = "story",
  PROJECT = "project",
  CONNECT = "connect",
}

const MENU_VARIANTS = {
  closed: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  open: {
    width: "25rem",
    height: "14rem",
    borderRadius: "4%",
    scale: 1.5,
    x: "-17rem",
    y: "1rem",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const STATIC_STYLES = {
  boxShadow: "0 4px 13px rgba(255, 255, 255, 0.5)",
  openBackground: "linear-gradient(to bottom, #f3ec78, #af4261)",
  closedBackground: "radial-gradient(circle, #181818, #0A0A0A)",
};

export const Navigation = ({
  isHomeInView,
  isStoryInView,
  isProjectInView,
  isConnectInView,
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();

  const activeStates = {
    [Sections.HOME]: isHomeInView,
    [Sections.STORY]: isStoryInView,
    [Sections.PROJECT]: isProjectInView,
    [Sections.CONNECT]: isConnectInView,
  };

  const toggleMenu = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== " ") return;
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 z-50">
        {/* Expanding Circular Menu */}
        <motion.button
          type="button"
          aria-expanded={isOpen}
          aria-label={intl.formatMessage(
            isOpen ? messages.closeMenu : messages.openMenu
          )}
          tabIndex={1}
          className="absolute top-4 left-4 cursor-pointer focus:outline-none"
          style={{
            overflow: "hidden",
            boxShadow: isOpen ? "none" : STATIC_STYLES.boxShadow,
            background: isOpen
              ? STATIC_STYLES.openBackground
              : STATIC_STYLES.closedBackground,
          }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={MENU_VARIANTS}
          whileHover={
            isOpen
              ? {}
              : {
                  scale: [1.05, 1, 1.05],
                  transition: {
                    type: "reverse",
                    duration: 1,
                    repeat: Infinity,
                  },
                  background: STATIC_STYLES.openBackground,
                }
          }
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
        />

        {/* Hamburger-to-X Icon */}
        <div className="relative top-6 left-6 w-10 h-10 flex flex-col justify-between pointer-events-none">
          <motion.div
            className="w-full h-[0.1rem] bg-white rounded"
            animate={{
              y: isOpen ? 6 : 0,
              x: isOpen ? -6 : -12,
              rotate: isOpen ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[0.18rem] bg-white rounded"
            animate={{
              y: isOpen ? -6 : 0,
              x: isOpen ? -6 : 0,
              rotate: isOpen ? -45 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[0.2rem] bg-white rounded"
            animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 0 : 12 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Links */}
        {isOpen && (
          <motion.div
            className="absolute top-[5.5rem] left-6 flex flex-col space-y-7 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {Object.values(Sections).map((section) => (
              <Link
                key={section}
                to={`${section}-section`}
                spy
                smooth
                duration={500}
                offset={0}
                onClick={() => setIsOpen(false)}
                className={classNames(
                  activeStates[section] ? "font-bold" : "font-light",
                  "text-[1.7rem] text-white hover:tracking-widest transition-all duration-300 group relative cursor-pointer"
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {intl.formatMessage(messages[section])}
                </motion.span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};
