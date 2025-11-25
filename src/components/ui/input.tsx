"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40",
        className
      )}
      {...props}
    />
  );
});

