"use client";

import React, { useState, useEffect } from "react";
import { CatCursor } from "./CatCursor";

export const CatCursorWrapper = ({ variant, forceActive = false, contained = false }: { variant?: "gray" | "black" | "yellow" | "white", forceActive?: boolean, contained?: boolean }) => {
    const [isActive, setIsActive] = useState(forceActive);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Initial check
        setIsDesktop(window.innerWidth >= 1024);

        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        const handleActivate = () => {
            if (window.innerWidth >= 1024) {
                setIsActive(true);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("activateCat", handleActivate);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("activateCat", handleActivate);
        };
    }, []);

    if (!isActive || !isDesktop) return null;

    return <CatCursor variant={variant} contained={contained} />;
};
