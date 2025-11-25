"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowEffect?: boolean;
  tiltEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  glowEffect = false,
  tiltEffect = false,
  children,
  ...props
}: CardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    if (!tiltEffect) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        "glass-panel rounded-3xl border border-white/10 p-6",
        hoverEffect && "hover-lift",
        glowEffect && "glow-effect",
        tiltEffect && "tilt-card",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tiltEffect
          ? {
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.3s ease",
          }
          : undefined
      }
      whileHover={hoverEffect ? { y: -8 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-white/70", className)} {...props} />;
}

