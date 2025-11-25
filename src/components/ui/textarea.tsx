"use client";

import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40",
        className
      )}
      {...props}
    />
  );
});

