// SongItem.tsx
import {
  motion,
  TargetAndTransition,
  useAnimationControls,
  AnimationControls,
} from "framer-motion";
import { useRef, ReactNode, useEffect } from "react";
import classNames from "classnames";
import { IconType } from "react-icons";

type Props = {
  title: ReactNode;
  links?: Array<{
    icon: IconType;
    url: string;
    hoverColor?: string;
  }>;
  previewSrc?: string;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  rightContent?: ReactNode;
  waveControls?: AnimationControls; // Add optional external animation controls
  customOverlay?: ReactNode; // Add optional custom overlay
  disableHover?: boolean; // Add option to disable hover animations
};

export const SongItem = ({
  title,
  links,
  previewSrc,
  className = "",
  onMouseEnter,
  onMouseLeave,
  rightContent,
  waveControls: externalWaveControls, // Rename to avoid conflict
  customOverlay,
  disableHover = false,
}: Props) => {
  /* ---------- (optional) lightweight hover‑preview ------------- */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const internalWaveControls = useAnimationControls();

  // Use external controls if provided, otherwise use internal controls
  const activeWaveControls = externalWaveControls || internalWaveControls;

  // Initialize animation controls to hidden state
  useEffect(() => {
    // Initialize the internal controls
    internalWaveControls.set("hidden");

    // If using external controls, ensure they're also initialized to hidden
    if (externalWaveControls) {
      console.log("SongItem: Using external wave controls");
    }
  }, [internalWaveControls, externalWaveControls]);

  const handleHoverStart = () => {
    if (disableHover) return;

    if (previewSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(previewSrc);
        audioRef.current.volume = 0.6;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => null);
    }

    // Only use hover controls if external controls aren't provided
    if (!externalWaveControls) {
      console.log("Starting hover animation");
      internalWaveControls.start("visible");
    }

    onMouseEnter?.();
  };

  const handleHoverEnd = () => {
    if (disableHover) return;

    audioRef.current?.pause();

    // Only use hover controls if external controls aren't provided
    if (!externalWaveControls) {
      console.log("Ending hover animation");
      internalWaveControls.start("hidden");
    }

    onMouseLeave?.();
  };

  /* variants for the overlay itself */
  const overlayVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    visible: {
      height: "2.75rem",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const barAnimate = (i: number): TargetAndTransition => {
    // Create varied animation patterns depending on the bar position
    let animPattern;

    if (externalWaveControls) {
      // Enhanced pattern for scroll-triggered animations
      if (i % 8 === 0) {
        // Create some emphasized bars
        animPattern = [0.2, 1, 0.4, 0.9, 0.2, 0.8];
      } else if (i % 5 === 0) {
        animPattern = [0.3, 0.7, 0.2, 0.6, 0.1, 0.5];
      } else if (i % 3 === 0) {
        animPattern = [0.1, 0.6, 0.3, 0.8, 0.2, 0.7];
      } else {
        animPattern = [0.4, 0.7, 0.2, 0.5, 0.3, 0.6];
      }

      return {
        scaleY: animPattern,
        transition: {
          repeat: Infinity,
          repeatType: "mirror" as const,
          duration: 1.2 + (i % 10) * 0.05, // Faster animation
          ease: i % 2 === 0 ? "easeInOut" : "circInOut",
        },
      };
    } else {
      // Standard animation for hover
      return {
        scaleY: [0.4, 1, 0.2, 0.8],
        transition: {
          repeat: Infinity,
          repeatType: "mirror" as const,
          duration: 2.2 + i * 0.01, // Even slower animation
          ease: "easeInOut" as const,
        },
      };
    }
  };

  return (
    <motion.div
      className={classNames(
        "group relative flex items-center justify-between py-4 border-b border-white overflow-hidden",
        disableHover ? "" : "cursor-pointer",
        className
      )}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart} // keyboard
      onBlur={handleHoverEnd}
      initial="initial"
      whileHover={disableHover ? {} : "hover"}
    >
      {/* song title */}
      <span className="text-2xl md:text-3xl lg:text-4xl text-white font-bold relative z-10">
        {title}
      </span>

      {/* custom right content or links */}
      <div className="relative z-10">
        {rightContent || (
          <div className="flex gap-4 text-2xl text-white">
            {links?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow external"
                aria-label={`${title} on music platform – opens in new tab`}
                className={`hover:${
                  link.hoverColor || "text-green-400"
                } transition-colors`}
                onClick={(e) => e.stopPropagation()}
              >
                <link.icon />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Custom overlay if provided */}
      {customOverlay}

      {/* ---------- WAVE OVERLAY --------------- */}
      <motion.div
        className="pointer-events-none absolute  bottom-0 left-0 right-0 flex items-end justify-evenly gap-0  w-full overflow-hidden"
        initial="hidden"
        variants={overlayVariants}
        animate={activeWaveControls}
        style={{ height: 0 }} // Ensure it starts at 0
      >
        {/* More bars for full width */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.span
            key={i}
            className="block w-[0.8%] border  border-[#ffffff9e] max-w-[6px] min-w-[2px] h-[1.5rem] rounded-t-sm origin-bottom"
            style={{
              transformOrigin: "bottom",
              // Dark theme colors that match the site better
              backgroundColor:
                i % 5 === 0
                  ? "#4f4f4f"
                  : i % 3 === 0
                  ? "#6b6b6b"
                  : i % 2 === 0
                  ? "#888888"
                  : "#3d3d3d",
            }}
            initial={{ scaleY: 0.2 }}
            animate={barAnimate(i)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
