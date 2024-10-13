import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string; // Keep gradientColor as prop to allow customization
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 50,
  gradientColor = "#FFD700", // Set default gradient color to gold
  gradientOpacity = 0.9,
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left; // X position relative to the card
      const y = e.clientY - top; // Y position relative to the card

      // Keep the mouse position within the bounds of the card
      mouseX.set(Math.min(width - 1, Math.max(0, x)));
      mouseY.set(Math.min(height - 1, Math.max(0, y)));
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col md:flex-row justify-evenly items-center text-white gap-5 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 rounded-xl overflow-hidden border border-transparent", 
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          filter: 'blur(10px)', // Add blur effect to the radial gradient
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}
