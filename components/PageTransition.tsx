"use client";

import React from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
        const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, filter: isDesktop ? "blur(10px)" : "blur(0px)", y: 10 }}
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
