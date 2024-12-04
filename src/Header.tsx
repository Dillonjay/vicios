import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

interface HeaderProps {
  isHomeInView: boolean;
  isStoryInView: boolean;
  isProjectInView: boolean;
  isConnectInView: boolean;
}

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en"); // 'en' for English, 'es' for Spanish

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <div className="flex items-center justify-center mt-6">
      {/* Toggle Container */}
      <div
        className="relative w-24 h-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-full shadow-inner flex items-center px-2"
        onClick={toggleLanguage}
      >
        {/* US Flag */}
        <span className="text-white text-sm">🇺🇸</span>

        {/* Toggle Knob */}
        <motion.div
          className="absolute w-8 h-8 bg-white rounded-full shadow-md border border-gray-300 cursor-pointer"
          animate={{
            x: language === "en" ? 0 : 40, // Moves knob left or right
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        ></motion.div>

        {/* Mexican Flag */}
        <span className="text-white text-sm ml-auto">🇲🇽</span>
      </div>
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
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      width: "20rem",
      height: "20rem",
      borderRadius: "4%",
      scale: 1.5,
      x: "-17rem",
      y: "-5rem",
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
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)} // Clicking the overlay closes the menu
        />
      )}
      <div className="fixed top-0 left-0 z-50 ">
        {/* Expanding Circular Menu */}
        <motion.div
          className="absolute top-3 left-3 bg-white text-black shadow-lg cursor-pointer"
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
                  scale: 1.05, // Slight scale effect
                  y: [-2, 0, -2], // Subtle bounce effect
                  transition: {
                    duration: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
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

            {/* Divider */}
            <div className="border-t border-black mt-4"></div>

            <LanguageToggle />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Header;
