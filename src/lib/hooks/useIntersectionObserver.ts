"use client";

import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0.1,
        root = null,
        rootMargin = "0px",
        freezeOnceVisible = false,
    }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    useEffect(() => {
        const node = elementRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(
            ([entry]) => setEntry(entry),
            observerParams
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return entry;
}

/**
 * Hook to check if element is in viewport
 */
export function useIsInView(
    ref: RefObject<Element>,
    options?: UseIntersectionObserverProps
) {
    const entry = useIntersectionObserver(ref, options);
    return entry?.isIntersecting ?? false;
}
