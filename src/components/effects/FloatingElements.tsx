"use client";

import { motion } from "framer-motion";

export function FloatingElements() {
    return (
        <div className="pointer-events-none fixed inset-0" aria-hidden="true">
            {/* Floating geometric shapes */}
            <motion.div
                className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-aurora-400/20 to-neon/20 blur-3xl"
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute right-[15%] top-[40%] h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/20 to-aurora-600/20 blur-3xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-[20%] left-[20%] h-36 w-36 rounded-full bg-gradient-to-br from-neon/20 to-aurora-400/20 blur-3xl"
                animate={{
                    y: [0, 25, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute bottom-[30%] right-[25%] h-28 w-28 rounded-full bg-gradient-to-br from-aurora-500/20 to-purple-400/20 blur-3xl"
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />
        </div>
    );
}
