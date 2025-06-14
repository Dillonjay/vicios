import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import viciosCierto from "/images/cierto-cover.jpeg";
import viciosBack from "/images/vicios-back-cover.png";
import viciosComplacent from "/images/complacent-lust-cover.jpeg";
import { MusicButton } from "../components/MusicButton";
import { ImSpinner3 } from "react-icons/im";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
import { messages } from "../config/projectMessages";
import { SPOTIFY, YOUTUBE, APPLE_MUSIC } from "../config/constants";
import { SongItem } from "../components/SongItem/SongItem";
import { StickySection } from "../components/StickySection";

interface FallingTextProps {
  phrase: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

const FallingText = ({
  phrase,
  index,
  scrollYProgress,
  start,
  end,
}: FallingTextProps) => {
  // Falling text animations
  const staggerStart = start + index * 0.02;
  const staggerEnd = end + index * 0.02;

  const opacity = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [0, 1]
  );
  const translateY = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [20, 0]
  );
  const translateX = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [-110, 0]
  );

  return (
    <motion.p
      className="text-3xl md:text-4xl lg:text-6xl text-white font-bold mb-2"
      style={{
        opacity,
        y: translateY,
        x: translateX,
      }}
    >
      {phrase}
    </motion.p>
  );
};

interface ProjectSectionProps {
  scrollYProgress: MotionValue<number>;
}

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ scrollYProgress }, ref) => {
    const [currentImage, setCurrentImage] = useState<string>(viciosBack);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const transitionTimerRef = useRef<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Title animations
    const titleOpacity = useTransform(scrollYProgress, [0.95, 1.0], [1, 0]);
    const titleTranslateY = useTransform(scrollYProgress, [0.9, 0.92], [0, 75]);

    // Clean up function for animations
    const cleanupTransition = () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
        canvasRef.current = null;
      }

      setIsTransitioning(false);
    };

    // Clean up on unmount
    useEffect(() => {
      return () => {
        cleanupTransition();
      };
    }, []);

    // Function to create a glitchy transition between images
    const changeImage = (newImage: string) => {
      console.log("Changing image to:", newImage);

      // If already showing this image or in transition, do nothing
      if (currentImage === newImage || isTransitioning) return;

      // Mark as transitioning
      setIsTransitioning(true);

      // Get the image element
      const img = imageRef.current;
      if (!img) {
        setCurrentImage(newImage);
        setIsTransitioning(false);
        return;
      }

      // Clean up any existing transition
      cleanupTransition();

      // Create a canvas for the effect
      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;

      // Set up the canvas
      const rect = img.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "10";

      // Add canvas to DOM
      img.parentNode?.appendChild(canvas);

      // Get canvas context
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        cleanupTransition();
        setCurrentImage(newImage);
        return;
      }

      // Load the new image
      const nextImg = new Image();
      nextImg.crossOrigin = "anonymous";
      nextImg.src = newImage;

      nextImg.onload = () => {
        // Draw initial image to the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Run the glitch effect
        let step = 0;
        const totalSteps = 8;

        const applyGlitchStep = () => {
          if (step >= totalSteps) {
            // Transition complete, clean up and set the new image
            cleanupTransition();
            setCurrentImage(newImage);
            return;
          }

          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Decide which image to use as base
          const baseImg = step < totalSteps / 2 ? img : nextImg;
          ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

          // --- Apply glitch effects ---

          // 1. Slice displacement effect
          const numSlices = 10;
          const sliceHeight = canvas.height / numSlices;

          for (let i = 0; i < numSlices; i++) {
            if (Math.random() > 0.6) {
              const y = i * sliceHeight;
              const offset = (Math.random() - 0.5) * 20;

              // Draw slice with offset
              ctx.drawImage(
                Math.random() > 0.5 ? nextImg : img,
                0,
                y,
                canvas.width,
                sliceHeight,
                offset,
                y,
                canvas.width,
                sliceHeight
              );
            }
          }

          // 2. Pixelation effect (every other step)
          if (step % 2 === 0) {
            const pixelSize = Math.max(
              2,
              Math.floor((totalSteps - step) * 1.5)
            );

            // Create temporary canvas for pixelation
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvas.width / pixelSize;
            tempCanvas.height = canvas.height / pixelSize;

            const tempCtx = tempCanvas.getContext("2d");
            if (tempCtx) {
              // Draw to small canvas (pixelated)
              tempCtx.drawImage(
                canvas,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
              );

              // Draw back to main canvas at full size (blocky)
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(
                tempCanvas,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height,
                0,
                0,
                canvas.width,
                canvas.height
              );
            }
          }

          // 3. Add scanlines
          if (step % 2 === 1) {
            for (let y = 0; y < canvas.height; y += 4) {
              if (Math.random() > 0.7) {
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.fillRect(0, y, canvas.width, 1);
              }
            }
          }

          // 4. Color shift
          if (Math.random() > 0.5) {
            ctx.globalCompositeOperation = "source-atop";
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgba(${r},${g},${b},0.1)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";
          }

          // Move to next step
          step++;
          transitionTimerRef.current = window.setTimeout(applyGlitchStep, 50);
        };

        // Start the transition
        applyGlitchStep();
      };

      // Handle image load failure
      nextImg.onerror = () => {
        cleanupTransition();
        setCurrentImage(newImage);
      };
    };

    const phrases = [
      "Tocando en\u00A0Texas",
      "Mixing in\u00A0Mexico",
      "Rolas en\u00A0queue",
      "Coming soon",
    ];

    return (
      <div
        id="project-section"
        className="relative h-[180vh]"
        style={{
          background: `
        linear-gradient(
          rgba(0, 0, 0, 1) 0%,
          rgba(20, 20, 20, 1) 50%,
          rgba(0, 0, 0, 1) 100%
        ),
        radial-gradient(
          circle,
          rgba(30,30, 30, 1) 0%,
          rgba(0, 0, 0, 1) 80%
        )`,
        }}
      >
        <StickySection
          ref={ref}
          title={messages.title}
          titleOpacity={titleOpacity}
          titleTranslateY={titleTranslateY}
        >
          <div className="relative h-screen w-full flex flex-col px-4 md:px-[5em]">
            {/* Falling Text and Image Row */}
            <div className="flex flex-col md:flex-row justify-between pt-28 md:pt-24">
              <div className="flex flex-col mb-8 md:mb-0">
                {phrases.map((phrase, index) => (
                  <FallingText
                    key={index}
                    phrase={phrase}
                    index={index}
                    scrollYProgress={scrollYProgress}
                    start={0.72}
                    end={0.75}
                  />
                ))}
              </div>

              <div className="relative w-full h-full md:w-80 md:h-80 mx-auto md:mx-0">
                <img
                  ref={imageRef}
                  src={currentImage}
                  alt="Album Cover"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "ease-in-out",
                  }}
                />
              </div>
            </div>

            {/* Song Items */}
            <div className="mt-6 md:mt-10">
              <SongItem
                title="Complacent Lust"
                className="py-3 md:py-4 relative"
                onMouseEnter={() => changeImage(viciosComplacent)}
                onMouseLeave={() => changeImage(viciosBack)}
                rightContent={
                  <div className="flex gap-2 md:gap-0">
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton icon={FaSpotify} href={SPOTIFY.complacent} />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton icon={FaYoutube} href={YOUTUBE.complacent} />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton
                        icon={FaApple}
                        href={APPLE_MUSIC.complacent}
                      />
                    </div>
                  </div>
                }
              />

              <SongItem
                title="Lo Cierto"
                className="py-3 md:py-4 relative"
                onMouseEnter={() => changeImage(viciosCierto)}
                onMouseLeave={() => changeImage(viciosBack)}
                rightContent={
                  <div className="flex gap-2 md:gap-0">
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton icon={FaSpotify} href={SPOTIFY.cierto} />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton icon={FaYoutube} href={YOUTUBE.cierto} />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton icon={FaApple} href={APPLE_MUSIC.cierto} />
                    </div>
                  </div>
                }
              />

              <SongItem
                title={
                  <div className="flex items-center gap-3 relative overflow-hidden rounded-lg px-3">
                    <span className="opacity-70" style={{ color: "#5a5a5a" }}>
                      <FormattedMessage {...messages.comingSoon} />
                    </span>
                    <ImSpinner3
                      className="text-white text-2xl md:text-3xl animate-spin opacity-70"
                      style={{
                        animationDuration: "2s",
                        color: "#5a5a5a",
                      }}
                    />
                  </div>
                }
                className="py-3 md:py-4 relative overflow-hidden"
                rightContent={
                  <div className="flex gap-2 md:gap-0">
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton
                        icon={FaSpotify}
                        href={SPOTIFY.vicios}
                        disabled
                      />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton
                        icon={FaYoutube}
                        href={YOUTUBE.vicios}
                        disabled
                      />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <MusicButton
                        icon={FaApple}
                        href={APPLE_MUSIC.vicios}
                        disabled
                      />
                    </div>
                  </div>
                }
                disableHover={true}
                customOverlay={
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      opacity: 0.15,
                      zIndex: 1,
                      width: "200%",
                      left: "-50%",
                    }}
                    animate={{
                      x: ["100%", "-100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "linear",
                    }}
                  />
                }
              />
            </div>
          </div>
        </StickySection>
      </div>
    );
  }
);

export default ProjectSection;
