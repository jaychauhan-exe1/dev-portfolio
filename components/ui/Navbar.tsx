'use client'
import React, { useRef, useEffect } from 'react'
import { Github } from "lucide-react";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mousePos.current = {
          x: e.clientX - rect.left - 20,
          y: e.clientY - rect.top - 20,
        };
      }
    };

    const animate = () => {
      if (followRef.current) {
        // Smooth interpolation
        followPos.current.x += (mousePos.current.x - followPos.current.x) * 0.2;
        followPos.current.y += (mousePos.current.y - followPos.current.y) * 0.2;

        followRef.current.style.left = `${followPos.current.x}px`;
        followRef.current.style.top = `${followPos.current.y}px`;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={navRef} className="fixed bottom-10 w-xs max-w-lg left-1/2 -translate-x-1/2 bg-border/30 border p-2 rounded-full overflow-hidden border-white dark:border-border backdrop-blur-xs ">
        <div className="bg-border/50 p-2 rounded-full w-fit border border-white/60 dark:border-border">
            <Github className="text-foreground" />
        </div>
        <div 
          ref={followRef}
          className="follow absolute w-6 h-6 rounded-full bg-primary blur-lg pointer-events-none"
        >
        </div>
    </div>
  )
}
