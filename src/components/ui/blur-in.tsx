"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurIntProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number; y?: number };
    visible: { filter: string; opacity: number; y?: number };
  };
  duration?: number;
}

const BlurIn = ({ word, className, variant, duration = 1.5 }: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(12px)", opacity: 0, y: 20 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        "font-display font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]",
        className,
      )}
    >
      {word}
    </motion.h1>
  );
};

export default BlurIn;