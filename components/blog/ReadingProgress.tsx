"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100] pointer-events-none"
      style={{ scaleX }}
    />,
    document.body
  );
}
