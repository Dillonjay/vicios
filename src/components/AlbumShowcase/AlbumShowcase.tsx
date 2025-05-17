import { motion, MotionValue, useTransform } from "framer-motion";
import { FaApple, FaYoutube, FaSpotify } from "react-icons/fa6";
import { MusicButton } from "../MusicButton";
import { SPOTIFY, YOUTUBE, APPLE_MUSIC } from "../../config/constants";

// Import easing functions from framer-motion
import { cubicBezier } from "framer-motion";

interface AlbumShowcaseProps {
  scrollYProgress: MotionValue<number>;
  albumCover: string;
  albumTitle: string;
  artistName: string;
}

export const AlbumShowcase = ({
  scrollYProgress,
  albumCover,
  albumTitle,
  artistName,
}: AlbumShowcaseProps) => {
  // Custom easing curve for smoother transitions
  const smoothEasing = cubicBezier(0.32, 0.72, 0.29, 0.99);

  // Dark overlay of "hero open up image"
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.195, 0.34],
    [0.58, 1]
  );

  // Single panel animation (expands from the middle to cover the screen)
  const panelWidth = useTransform(
    scrollYProgress,
    [0.1455, 0.34],
    ["0%", "100%"]
  );

  const underneathOpacity = useTransform(
    scrollYProgress,
    [0.179, 0.34],
    [0, 1]
  );

  // Initial scale for the container (stops at 34%)
  const initialScale = useTransform(
    scrollYProgress,
    [0.16, 0.34], // Align starting threshold with other animations
    [0.7, 1.0],
    { ease: smoothEasing }
  );

  // Scale for inner content that starts at 34% when shadow fades
  const innerScale = useTransform(scrollYProgress, [0.34, 0.45], [1.0, 1.12]);

  // 3D perspective transform for the album cover - UPDATED to end at 0.34
  const coverRotateX = useTransform(
    scrollYProgress,
    [0.16, 0.34], // Align with other animations
    ["5deg", "0deg"],
    { ease: smoothEasing }
  );

  const coverDepth = useTransform(
    scrollYProgress,
    [0.16, 0.34], // Align with other animations
    ["-15px", "0px"],
    { ease: smoothEasing }
  );

  // The spotify piece that will just have links - synchronized with inner image zoom
  const singleTextOpacity = useTransform(scrollYProgress, [0.34, 0.45], [0, 1]);
  const singleTextTranslateY = useTransform(
    scrollYProgress,
    [0.34, 0.45],
    [120, 90]
  );

  // Shadow transition with just three states: intense, less intense, then none
  const coverShadow = useTransform(
    scrollYProgress,
    [0.195, 0.34, 0.42, 0.45],
    [
      "inset 0 0 25px 10px rgba(0, 0, 0, 0.8), inset 0 0 8px 2px rgba(255, 255, 255, 0.15)",
      "inset 0 0 25px 10px rgba(0, 0, 0, 0.8), inset 0 0 8px 2px rgba(255, 255, 255, 0.15)",
      "inset 0 0 15px 3px rgba(0, 0, 0, 0.6), inset 0 0 6px 1px rgba(255, 255, 255, 0.10)",
      "none",
    ]
  );

  // Extended visibility - stays fully visible longer
  const componentVisibility = useTransform(
    scrollYProgress,
    [0.45, 0.55],
    [1, 0]
  );

  // Extract the inline useTransform to component level
  const glowOverlayOpacity = useTransform(scrollYProgress, [0, 0.165], [1, 0]);

  return (
    <div className="relative h-[350vh] w-full bg-black">
      <motion.div
        className="sticky top-0 h-screen w-full flex justify-center bg-cover bg-no-repeat bg-[url('/images/vicios-hero.jpeg')] bg-center"
        style={{
          opacity: componentVisibility,
        }}
      >
        {/* Glow Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full glow-overlay"
          style={{
            opacity: glowOverlayOpacity,
          }}
        ></motion.div>

        {/* Background Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black z-20"
          style={{ opacity: darkOverlayOpacity }}
        />

        {/* Sliding Black Panel */}
        <motion.div
          className="absolute top-0 h-full flex flex-col justify-center items-center bg-black z-30"
          style={{
            width: panelWidth,
            boxShadow: "inset 0px 0px 30px rgba(0, 0, 0, 0.7)",
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
            transformOrigin: "center center",
          }}
        >
          {/* Album Cover with Subtle Inset Effect - Container */}
          <motion.div
            className="bg-center bg-cover w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] lg:w-[30vw] lg:h-[30vw] max-w-[30vh] max-h-[30vh] overflow-hidden relative"
            style={{
              opacity: underneathOpacity,
              scale: initialScale,
              boxShadow: coverShadow,
              rotateX: coverRotateX,
              translateZ: coverDepth,
              transformStyle: "preserve-3d",
              perspective: "1000px",
              transformOrigin: "center center",
            }}
          >
            {/* Inner image that zooms as shadow fades */}
            <motion.div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${albumCover})`,
                scale: innerScale,
                transformOrigin: "center center",
              }}
            />
          </motion.div>

          {/* Supporting Text */}
          <motion.div
            className="text-center text-white mt-8"
            style={{
              opacity: singleTextOpacity,
              translateY: singleTextTranslateY,
            }}
          >
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl">
              <span className="font-extralight tracking-wide uppercase">
                {artistName}
              </span>
              <span className="opacity-60 mx-1">—</span>
              <span className="font-extrabold">{albumTitle}</span>
            </h2>

            <div className="flex justify-center items-center gap-2 md:gap-0 mt-4">
              <MusicButton icon={FaSpotify} href={SPOTIFY.complacent} />
              <MusicButton icon={FaApple} href={APPLE_MUSIC.complacent} />
              <MusicButton icon={FaYoutube} href={YOUTUBE.complacent} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AlbumShowcase;
