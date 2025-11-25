"use client";

import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40",
        className
      )}
      {...props}
    />
  );
});

