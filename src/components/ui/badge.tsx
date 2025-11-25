import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "success" | "warning" | "danger" | "default";
};

const variants = {
  success: "bg-emerald-400/20 text-emerald-200 border border-emerald-300/40",
  warning: "bg-amber-400/20 text-amber-100 border border-amber-300/40",
  danger: "bg-rose-500/20 text-rose-100 border border-rose-300/40",
  default: "bg-white/10 text-white border border-white/20",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

