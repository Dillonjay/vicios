import { useEffect, useState } from "react";

const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [element, threshold]);

  return [setElement, isInView];
};

export default useInView;
