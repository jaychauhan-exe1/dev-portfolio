"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -45, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute z-100 px-3 py-1.5 text-xs font-semibold text-foreground bg-background/80 backdrop-blur-xl border border-border rounded-lg shadow-2xl whitespace-nowrap pointer-events-none"
                    >
                        {content}
                        <div className="absolute -bottom-[5.5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background/80 border-r border-b border-border rotate-45 backdrop-blur-xl" />
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
};
