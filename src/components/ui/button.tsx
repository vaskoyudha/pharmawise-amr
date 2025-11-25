"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, MouseEvent, useState } from "react";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "ripple-container inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-aurora-300/40 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-aurora-400 to-purple-500 text-white shadow-lg shadow-aurora-600/30 hover:shadow-aurora-600/50 hover:scale-105 hover:brightness-110",
        secondary: "glass-panel text-white hover:text-neon hover:border-aurora-200 hover:scale-105",
        ghost: "text-aurora-200 hover:text-white hover:bg-white/5 hover:scale-105",
      },
      size: {
        sm: "text-xs px-4 py-1.5",
        md: "text-sm px-5 py-2",
        lg: "text-base px-6 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface RippleType {
  x: number;
  y: number;
  id: number;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, loading, onClick, children, disabled, ...props },
  ref
) {
  const Comp = asChild ? Slot : motion.button;
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    // Call original onClick
    onClick?.(e);
  };

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
          }}
        />
      ))}
    </Comp>
  );
});

