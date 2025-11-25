"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    animation?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "bounce";
    delay?: number;
    duration?: number;
    className?: string;
}

const variants = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },
    slideDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
    bounce: {
        hidden: { opacity: 0, scale: 0.3 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function ScrollReveal({
    children,
    animation = "slideUp",
    delay = 0,
    duration = 0.6,
    className,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[animation]}
            transition={{
                duration,
                delay,
                ease: [0.4, 0, 0.2, 1],
                ...(animation === "bounce" && { ease: [0.68, -0.55, 0.265, 1.55] }),
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
