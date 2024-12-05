import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-scroll";

interface HeaderProps {
  isHomeInView: boolean;
  isStoryInView: boolean;
  isProjectInView: boolean;
  isConnectInView: boolean;
}

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en"); // 'en' for English, 'es' for Spanish
  const [isHovered, setIsHovered] = useState(false);
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <div className="fixed top-4 right-4">
      {/* Toggle Container */}
      <motion.div
        onClick={toggleLanguage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex justify-between items-center p-5 cursor-pointer shadow-md overflow-hidden"
        initial={{
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
        }}
        whileHover={{
          width: "12rem",
          height: "4rem",
          borderRadius: "8px",
        }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{ boxShadow: "0 4px 13px rgba(255, 255, 255, 0.5)" }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-[150%] aspect-w-16 aspect-h-9 bg-[url('./assets/mountain.svg')]"
          animate={{ opacity: language === "en" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`absolute inset-0 bg-black ${
              isHovered ? "bg-opacity-40" : ""
            }`}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-cover bg-[150%] aspect-w-16 aspect-h-9 bg-[url('./assets/canyon.svg')]"
          animate={{ opacity: language === "es" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`absolute inset-0 bg-black ${
              isHovered ? "bg-opacity-40" : ""
            }`}
          />
        </motion.div>
        {/* Labels */}
        <motion.span
          className={`z-10 ${
            isHovered ? "text-white " : "text-black"
          } font-semibold`}
          animate={{ opacity: language === "en" ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          English
        </motion.span>
        <motion.span
          className={`z-10 ${
            isHovered ? "text-white " : "text-black"
          }font-semibold`}
          animate={{ opacity: language === "es" ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Español
        </motion.span>

        {/* Sliding Knob */}
        <motion.div
          className="absolute rounded-[8px] text-3xl shadow-lg flex items-center justify-center z-20"
          style={{
            background: "transparent",
          }}
          initial={{ top: 0, left: 0 }}
          animate={{
            width: isHovered ? "3rem" : "4rem",
            height: isHovered ? "3rem" : "4rem",
            // TODO: useMemo for performance
            left:
              !isHovered && language === "es"
                ? "calc(100% - 64px)"
                : !isHovered && language === "en"
                ? 0
                : language === "en"
                ? 6
                : "calc(100% - 55px)",
            top: !isHovered ? 0 : "0.5rem",
            background: isHovered
              ? "linear-gradient(to bottom,#f3ec78, #af4261)"
              : "black",
          }}
          transition={{
            type: "easeInOut",
            duration: 0.2,
            // damping: 20,
          }}
        >
          {language === "en" ? "🇺🇸" : "🇲🇽"}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = ({
  isHomeInView,
  isStoryInView,
  isProjectInView,
  isConnectInView,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("isHomeInView", isHomeInView);

  // Variants for the expanding circle
  const menuVariants = {
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
      width: "20rem",
      height: "11rem",
      borderRadius: "4%",
      scale: 1.5,
      x: "-17rem",
      y: "1rem",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const activeStates = {
    Home: isHomeInView,
    Story: isStoryInView,
    Project: isProjectInView,
    Connect: isConnectInView,
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
            onClick={() => setIsOpen(false)} // Clicking the overlay closes the menu
          />
        )}
      </AnimatePresence>
      <div className="fixed top-0 left-0 z-50">
        {/* Expanding Circular Menu */}
        <motion.div
          className="absolute top-4 left-4 cursor-pointer"
          style={{
            overflow: "hidden",
            boxShadow: isOpen ? "none" : "0 4px 13px rgba(255, 255, 255, 0.5)",
            background: isOpen
              ? "linear-gradient(to bottom, #f3ec78, #af4261)"
              : "radial-gradient(circle, #181818, #0A0A0A)", // Default for closed state
          }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          whileHover={
            isOpen
              ? {}
              : {
                  scale: [1.05, 1, 1.05], // Add a subtle pulse effect
                  transition: {
                    type: "reverse",
                    duration: 1,
                    repeat: Infinity,
                  },
                  background: "linear-gradient(135deg, #f3ec78, #af4261)", // Add a gradient background
                }
          }
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {/* Fixed Hamburger-to-X Icon */}
        <div className="relative top-6 left-6 w-10 h-10 flex flex-col justify-between pointer-events-none">
          {/* Top Line */}
          <motion.div
            className=" w-full h-[0.1rem] bg-white rounded"
            animate={{
              y: isOpen ? 6 : 0,
              x: isOpen ? -6 : -12,
              rotate: isOpen ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Middle Line */}
          <motion.div
            className="w-full h-[0.18rem] bg-white rounded"
            animate={{
              y: isOpen ? -6 : 0,
              x: isOpen ? -6 : 0,
              rotate: isOpen ? -45 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom Line */}
          <motion.div
            className=" w-full h-[0.2rem] bg-white rounded"
            animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 0 : 12 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Links */}
        {isOpen && (
          <motion.div
            className="absolute top-[4.5rem] left-6 flex flex-col space-y-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["Home", "Story", "Project", "Connect"].map((link, i) => (
              <Link
                key={link}
                to={`${link.toLowerCase()}-section`} // Target section ID
                spy={true}
                smooth={true}
                duration={500}
                offset={0}
                onClick={() => setIsOpen(false)} // Close the menu on click
                className={`${
                  activeStates[link] ? "font-bold" : "font-light"
                } text-white hover:tracking-widest transition-all duration-300 group relative cursor-pointer`}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </motion.div>
        )}
        <AnimatePresence>{isOpen && <LanguageToggle />}</AnimatePresence>
        <LanguageToggle />
      </div>
    </>
  );
};

export default Header;
