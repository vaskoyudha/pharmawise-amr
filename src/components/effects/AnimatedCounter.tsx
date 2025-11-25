"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function AnimatedCounter({
    value,
    duration = 2,
    decimals = 0,
    suffix = "",
    prefix = "",
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [isInView, setIsInView] = useState(false);

    const spring = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const display = useTransform(spring, (current) =>
        current.toFixed(decimals)
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true);
                    spring.set(value);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isInView, spring, value]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    );
}
