import React, { ReactNode, forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { FormattedMessage } from "react-intl";

interface StickySectionProps {
  title?: string | { id: string; defaultMessage: string };
  titleOpacity: MotionValue<number>;
  titleTranslateY: MotionValue<number>;
  children: ReactNode;
}

export const StickySection = forwardRef<HTMLDivElement, StickySectionProps>(
  ({ title, titleOpacity, titleTranslateY, children }, ref) => {
    return (
      <div ref={ref} className="sticky top-0 h-screen max-w-[100rem] mx-auto">
        {title && (
          <motion.div
            className="absolute bottom-2 border-b-2 border-[#ffffff36] w-full flex justify-end z-30 px-4 sm:px-6 md:px-[5em]"
            style={{
              opacity: titleOpacity,
              translateY: titleTranslateY,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-wide">
              {typeof title === "string" ? (
                title
              ) : (
                <FormattedMessage {...title} />
              )}
            </div>
          </motion.div>
        )}
        {children}
      </div>
    );
  }
);

export default StickySection;
