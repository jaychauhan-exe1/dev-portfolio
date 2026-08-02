"use client";

import Link from "next/link";
import { useEffect } from "react";
import { GradientButton } from "../components/ui/GradientButton";

export default function NotFound() {
  useEffect(() => {
    // Hide navbar on mount
    window.dispatchEvent(new CustomEvent('hideNavbar', { detail: { hidden: true } }));

    // Show navbar on unmount
    return () => {
      window.dispatchEvent(new CustomEvent('hideNavbar', { detail: { hidden: false } }));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-10 px-4">
      <div className="relative mb-6 select-none flex items-center justify-center">
        {/* Large Background 404 with Sketch Font */}
        <div className="absolute text-[12rem] md:text-[22rem] font-bold text-foreground/[0.03] dark:text-foreground/[0.05] leading-none tracking-tighter font-cabin-sketch">
          404
        </div>

        {/* Designer/Developer Illustration (Hand-drawn Monitor with floating elements) */}
        <div className="relative z-10 text-foreground w-[240px] h-[240px] flex items-center justify-center scale-75 md:scale-90">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Monitor Sketch */}
            <rect x="50" y="80" width="140" height="90" rx="8" stroke="currentColor" strokeWidth="4" fill="var(--background)" />
            <rect x="58" y="88" width="124" height="65" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />

            {/* Monitor Stand */}
            <path d="M100 170L95 195H145L140 170" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="85" y="195" width="70" height="4" rx="2" fill="currentColor" />

            {/* Elements Floating Out (Chaos) */}
            {/* Code Braces {} */}
            <g transform="translate(45, 60) rotate(-15)">
              <text x="0" y="0" fill="currentColor" fontSize="32" fontWeight="bold" fontFamily="monospace">{"{"}</text>
            </g>
            <g transform="translate(175, 55) rotate(20)">
              <text x="0" y="0" fill="currentColor" fontSize="32" fontWeight="bold" fontFamily="monospace">{"}"}</text>
            </g>

            {/* Pencil/Stylus */}
            <g transform="translate(165, 30) rotate(25)">
              <rect x="0" y="0" width="8" height="35" rx="1" stroke="currentColor" strokeWidth="2" fill="var(--background)" />
              <path d="M0 0L4 -10L8 0" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            </g>

            {/* Pixel / Square */}
            <rect x="110" y="40" width="12" height="12" fill="currentColor" transform="rotate(35 110 40)" />

            {/* Cursor */}
            <path d="M10 10L25 35L18 37L12 43V10Z" fill="currentColor" stroke="currentColor" strokeWidth="2" transform="translate(110, 100) rotate(-15)" />

            {/* Squiggle swirl */}
            <path d="M65 45C60 35 80 30 85 40C90 50 70 55 65 45" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

            {/* Coding tags / elements */}
            <path d="M190 100L200 110L190 120" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 140L20 150L30 160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="text-center z-20">
        <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Oops... Index Out of Bounds!
        </h1>
        <div className="text-foreground/50 max-w-[280px] md:max-w-md mx-auto text-sm md:text-base leading-relaxed mb-10 space-y-1">
          <p>This page hasn&apos;t been designed yet or was</p>
          <p>accidentally dropped during the last refactor.</p>
          <p>Let&apos;s get you back to the main stack.</p>
        </div>

        <div className="px-4 flex justify-center">
          <Link href="/">
            <GradientButton>
              Go Home
            </GradientButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
