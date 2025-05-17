/**
 * Animation utility functions
 */

/**
 * Create a smooth scrolling instance with Lenis
 * @param options Options for Lenis scroll
 * @returns Cleanup function
 */
export const setupSmoothScroll = (
  options: {
    duration?: number;
    easing?: (t: number) => number;
  } = {}
) => {
  // This is just a placeholder - you'll need to add the actual Lenis import
  // and implementation based on your specific needs

  // Example implementation
  const defaultOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  // mergedOptions would be used in the actual implementation
  const mergedOptions = { ...defaultOptions, ...options };
  console.log("Options for smooth scroll:", mergedOptions);

  // Your Lenis implementation here

  return () => {
    // Clean up function
  };
};

/**
 * Standard animation variants for Framer Motion
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
