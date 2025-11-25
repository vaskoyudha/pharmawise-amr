"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Load theme from localStorage or system preference
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        if (savedTheme) {
            setThemeState(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            setThemeState("light");
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Apply theme to document
        const root = document.documentElement;

        if (theme === "light") {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }

        // Save to localStorage
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
