"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface BlurInProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number; y?: number };
    visible: { filter: string; opacity: number; y?: number };
  };
  duration?: number;
}

const BlurIn = React.memo(({ word, className, variant, duration = 1.5 }: BlurInProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(12px)", opacity: 0, translateY: 20 },
    visible: { filter: "blur(0px)", opacity: 1, translateY: 0 },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration, ease: "easeInOut" }}
      variants={combinedVariants}
      style={{ willChange: "transform, filter, opacity" }} // Add will-change hint
      className={cn(
        "font-display font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]",
        className,
      )}
    >
      {word}
    </motion.h1>
  );
});

export default BlurIn;
