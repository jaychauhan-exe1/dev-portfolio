"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a more premium "pop"
            }}
        >
            {children}
        </motion.div>
    );
}
