import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMailchimp,
  FaYoutube,
} from "react-icons/fa6";

const ContactSection = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorX(e.clientX - rect.left);
    setCursorY(e.clientY - rect.top);
  };

  return (
    <div
      className="relative h-screen w-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Flashlight Mask Layer */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          WebkitMaskImage: `radial-gradient(circle 150px at ${cursorX}px ${cursorY}px, black 90%, transparent 100%)`,
          maskImage: `radial-gradient(circle 150px at ${cursorX}px ${cursorY}px, black 90%, transparent 100%)`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
          <h1 className="text-9xl font-black">CONNECT</h1>
          <div className="flex mt-9 gap-8">
            <FaInstagram size="4em" />
            <FaFacebook size="4em" />
            <FaYoutube size="4em" />
            <FaMailchimp size="4em" />
          </div>
        </div>
      </div>

      {/* Default Black Background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-9xl font-black">CONNECT</h1>
        <div className="flex mt-9 gap-8">
          <FaInstagram size="4em" />
          <FaFacebook size="4em" />
          <FaYoutube size="4em" />
          <FaMailchimp size="4em" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

/**
 * .main{
  height: 100vh;

  .mask, .body{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #afa18f;
    font-size: 64px;
    line-height: 66px;
    cursor: default;
    
    p{
      width: 1000px;
      padding:40px;
    }
    span{
      color: #ec4e39;
    }
  }

  .mask{
    mask-image: url('../../public/mask.svg');
    mask-repeat: no-repeat;
    mask-size: 40px;
    background: #ec4e39;
    position: absolute;
    color: black;
  }
}

'use client'
import styles from './page.module.scss'
import { useState } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className={styles.main}>
      <motion.div 
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration:0.5}}
      >
          <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
            A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.
          </p>
      </motion.div>

      <div className={styles.body}>
        <p>I'm a <span>selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.</p>
      </div>

    </main>
  )
}

import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMousePosition;
 */
