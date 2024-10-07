"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface BoxRevealProps {
  children: JSX.Element;
  width?: string;
  boxColor?: string;
  duration?: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor = "#5046e6",
  duration = 0.5,
}: BoxRevealProps) => {
  const mainControls = useAnimation(); 
  const slideControls = useAnimation(); 
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const slideVariants = useMemo(
    () => ({
      hidden: { left: 0 },
      visible: { left: "100%" },
    }),
    []
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} className={`relative ${width} overflow-hidden`}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay: 0.25 }}
        className="z-10"
      >
        {children}
      </motion.div>

      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={slideControls}
        transition={{ duration, ease: "easeIn" }}
        className="absolute top-4 bottom-4 left-0 right-0 z-20"
        style={{ background: boxColor }}
      />
    </div>
  );
};

export default BoxReveal;
