import { forwardRef, useState, useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import viciosCierto from "./assets/cierto-cover.jpeg";
import viciosBack from "./assets/vicios-back-cover.png";
import viciosOndos from "./assets/vicios-1.jpeg";
import { MusicButton } from "./MusicButton";
import { ImSpinner3 } from "react-icons/im";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
import { messages } from "./projectMessages";

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
      className="text-3xl md:text-4xl lg:text-6xl text-white font-bold"
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
{
  /* <div className="relative h-[220vh]">
<div className="sticky top-0 h-screen max-w-[100rem] mx-auto">
  <motion.div
    className="absolute bottom-2 border-b-4 border-[#4b4b4a] w-full flex justify-end z-30 px-[5em]"
    style={{
      opacity: storyOpacity,
      translateY: storyTranslateY,
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-white text-7xl font-black uppercase tracking-wide">
      <FormattedMessage {...messages.title} />
    </div>
  </motion.div>
  <motion.div
   */
}

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ scrollYProgress }, ref) => {
    const [currentImage, setCurrentImage] = useState<string>(viciosBack);
    const isAnimating = useRef(false);
    const imageRef = useRef<HTMLImageElement>(null);

    // Function to handle glitchy image transitions
    const changeImage = (newImage: string) => {
      if (currentImage === newImage || isAnimating.current) return;

      isAnimating.current = true;

      // Create a canvas for the glitch effect
      const img = imageRef.current;
      if (!img) {
        setCurrentImage(newImage);
        isAnimating.current = false;
        return;
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        setCurrentImage(newImage);
        isAnimating.current = false;
        return;
      }

      // Set canvas dimensions
      const rect = img.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Position the canvas over the image
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "10";
      img.parentNode?.appendChild(canvas);

      // Draw initial image
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Load the new image
      const nextImg = new Image();
      nextImg.crossOrigin = "anonymous";
      nextImg.src = newImage;
      nextImg.onload = () => {
        let step = 0;
        const totalSteps = 12;

        const glitchEffect = () => {
          if (step >= totalSteps) {
            // Clean up and finish
            if (canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
            setCurrentImage(newImage);
            isAnimating.current = false;
            return;
          }

          // Clear canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw base image
          const baseImg = step < totalSteps / 2 ? img : nextImg;
          context.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

          // Apply glitch effects
          const sliceHeight = canvas.height / 20;
          const numSlices = Math.floor(canvas.height / sliceHeight);

          for (let i = 0; i < numSlices; i++) {
            // Random displacement
            const displacement = Math.random() * 20 - 10;
            const y = i * sliceHeight;

            // Randomize which slices get glitched
            if (Math.random() > 0.7) {
              // Draw slices with random offsets
              context.drawImage(
                step < totalSteps / 2 ? nextImg : img,
                0,
                y,
                canvas.width,
                sliceHeight,
                displacement,
                y,
                canvas.width,
                sliceHeight
              );
            }

            // Add scanlines
            if (Math.random() > 0.8) {
              context.fillStyle = "rgba(255, 255, 255, 0.1)";
              context.fillRect(
                0,
                y + Math.random() * sliceHeight,
                canvas.width,
                1
              );
            }
          }

          // Add color shift occasionally
          if (step % 2 === 0) {
            context.globalCompositeOperation = "screen";
            context.fillStyle = `rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 0.1)`;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "source-over";
          }

          // Add pixelation effect
          if (step % 3 === 0) {
            const pixelSize = Math.max(2, Math.floor(Math.random() * 10));
            const tempCanvas = document.createElement("canvas");
            const tempContext = tempCanvas.getContext("2d");
            if (tempContext) {
              tempCanvas.width = canvas.width / pixelSize;
              tempCanvas.height = canvas.height / pixelSize;

              // Draw at a lower resolution
              tempContext.drawImage(
                canvas,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
              );

              // Scale back up with nearest-neighbor interpolation
              context.imageSmoothingEnabled = false;
              context.drawImage(
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

          step++;
          setTimeout(glitchEffect, 50);
        };

        glitchEffect();
      };

      // Fallback if image loading fails
      nextImg.onerror = () => {
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        setCurrentImage(newImage);
        isAnimating.current = false;
      };
    };

    const phrases = ["The night isn't over", "Until I'm", "Far from", "Sober"];
    const projectOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);
    const projectTranslateY = useTransform(
      scrollYProgress,
      [0.9, 0.95],
      [0, 65]
    );

    return (
      <div
        className="relative h-[100vh] "
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
        <div
          id="project-section"
          ref={ref}
          className="max-w-[100rem] mx-auto px-[5em]"
        >
          <motion.div
            className="absolute right-0 w-full flex justify-end z-30 bottom-2 border-b-4 border-[#4b4b4a] px-[5em]"
            style={{
              opacity: projectOpacity,
              translateY: projectTranslateY,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-wide">
              <FormattedMessage {...messages.title} />
            </div>
          </motion.div>

          {/* Falling Text and Image Row */}
          <div className="flex flex-col md:flex-row justify-between pt-12 md:pt-24">
            <div className="flex flex-col mb-8 md:mb-0">
              {phrases.map((phrase, index) => (
                <FallingText
                  key={index}
                  phrase={phrase}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  start={0.75}
                  end={0.78}
                />
              ))}
            </div>

            <div className="relative w-48 h-48 md:w-80 md:h-80 mx-auto md:mx-0">
              <img
                ref={imageRef}
                src={currentImage}
                alt="Album Cover"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
          </div>

          {/* Horizontal Lines */}
          <div className="mt-12 md:mt-24 sticky top-0">
            {/* Lo Cierto */}
            <div
              className="relative cursor-pointer border-b border-white py-3 md:py-4"
              onMouseEnter={() => changeImage(viciosCierto)}
              onMouseLeave={() => changeImage(viciosBack)}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2 md:mb-0">
                  Lo Cierto
                </h3>

                <div className="flex gap-2 md:gap-0">
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaSpotify}
                      href="https://open.spotify.com/artist/viciososocultos"
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaYoutube}
                      href="https://youtube.com/@viciososocultos"
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaApple}
                      href="https://music.apple.com/artist/viciososocultos"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ondos */}
            <div
              className="relative cursor-pointer border-b border-white py-3 md:py-4"
              onMouseEnter={() => changeImage(viciosOndos)}
              onMouseLeave={() => changeImage(viciosBack)}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">
                    <FormattedMessage {...messages.comingSoon} />
                  </h3>
                  <ImSpinner3
                    className="text-white text-2xl md:text-3xl lg:text-4xl animate-spin"
                    style={{ animationDuration: "2s" }}
                  />
                </div>
                <div className="flex gap-2 md:gap-0">
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaSpotify}
                      href="https://open.spotify.com/artist/viciososocultos"
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaYoutube}
                      href="https://youtube.com/@viciososocultos"
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MusicButton
                      icon={FaApple}
                      href="https://music.apple.com/artist/viciososocultos"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectSection;
