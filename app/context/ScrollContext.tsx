"use client";

import { createContext, useContext, useRef, useEffect, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

type ScrollContextType = {
    targetRef: React.RefObject<HTMLDivElement>;
    bgOpacity: MotionValue<number>;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const { scrollYProgress } = useScroll({
        target: mounted ? targetRef : undefined,
        offset: ["start end", "end start"], // bottom → top
    });

    const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

    return (
        <ScrollContext.Provider value={{ targetRef, bgOpacity }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScrollContext() {
    const ctx = useContext(ScrollContext);
    if (!ctx) throw new Error("useScrollContext must be used inside ScrollProvider");
    return ctx;
}
