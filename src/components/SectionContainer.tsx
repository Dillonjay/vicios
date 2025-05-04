import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ children, id, className = "" }, ref) => {
    return (
      <motion.div
        id={id}
        ref={ref}
        className={`relative max-w-[100rem] mx-auto ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

export default SectionContainer;
