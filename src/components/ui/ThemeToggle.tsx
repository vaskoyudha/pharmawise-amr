"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/theme-provider";

export function ThemeToggle() {
    try {
        const { theme, toggleTheme } = useTheme();

        return (
            <motion.button
                onClick={toggleTheme}
                className="glass-panel relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-aurora-400/50 hover:text-aurora-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === "dark" ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </motion.div>
            </motion.button>
        );
    } catch {
        // If theme context is not available, return null
        return null;
    }
}
