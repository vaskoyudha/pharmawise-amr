"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    animation?: "pulse" | "shimmer";
}

export function Skeleton({
    className,
    variant = "rectangular",
    animation = "shimmer",
}: SkeletonProps) {
    return (
        <div
            className={cn(
                "bg-white/10",
                animation === "pulse" && "animate-pulse",
                animation === "shimmer" && "shimmer",
                variant === "text" && "h-4 w-full rounded",
                variant === "circular" && "rounded-full",
                variant === "rectangular" && "h-12 w-full rounded-lg",
                className
            )}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="glass-panel space-y-4 rounded-3xl border border-white/10 p-6">
            <Skeleton variant="text" className="h-6 w-3/4" />
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    );
}
