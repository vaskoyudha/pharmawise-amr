"use client";

import { useEffect, useState } from "react";

interface MousePosition {
    x: number;
    y: number;
}

export function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const updateMousePosition = (e: MouseEvent) => {
            // Throttle updates for performance
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
                timeoutId = null as unknown as NodeJS.Timeout;
            }, 16); // ~60fps
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return mousePosition;
}
