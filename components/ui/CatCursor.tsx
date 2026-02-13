"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "motion/react";

// --- Types ---
type CatState = "SITTING" | "RUNNING" | "EATING" | "WATCHING";
type CatVariant = "gray" | "black" | "yellow";

// --- Components ---

const Fishbone = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: "crispEdges" }}>
        {/* Tail (Back) */}
        <rect x="20" y="9" width="2" height="6" fill="currentColor" />
        <rect x="18" y="10" width="2" height="4" fill="currentColor" />

        {/* Spine */}
        <rect x="8" y="11" width="10" height="2" fill="currentColor" />

        {/* Ribs */}
        <rect x="14" y="7" width="2" height="10" fill="currentColor" />
        <rect x="10" y="7" width="2" height="10" fill="currentColor" />

        {/* Head (Front) */}
        <rect x="2" y="9" width="6" height="6" fill="currentColor" />
        <rect x="4" y="11" width="2" height="2" fill="currentColor" opacity="0.3" /> {/* Eye Socket */}
        <rect x="1" y="10" width="1" height="4" fill="currentColor" /> {/* Snout Tip */}
    </svg>
);

const DustCloud = ({ size = 12 }: { size?: number }) => (
    <svg width={size} height={size * 0.8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: "crispEdges" }}>
        <rect x="2" y="2" width="6" height="4" fill="currentColor" opacity="0.6" />
        <rect x="0" y="3" width="10" height="2" fill="currentColor" opacity="0.4" />
        <rect x="3" y="0" width="4" height="8" fill="currentColor" opacity="0.3" />
    </svg>
);

const PixelCat = ({ state, isAngry = false, variant = "gray" }: { state: CatState; isAngry?: boolean; variant?: CatVariant }) => {
    // Color palettes for different variants
    const palettes: Record<CatVariant, any> = {
        gray: {
            body: "#71717A",
            bodyDark: "#3F3F46",
            white: "#FFFFFF",
            black: "#121215",
            collar: "#3F3F46",
            eye: "#121215",
            beard: "#71717A",
            nose: "#71717A"
        },
        black: {
            body: "#121215",
            bodyDark: "#09090b",
            white: "#FFFFFF",
            black: "#71717A", // gray feet and ears
            collar: "#3F3F46",
            eye: "#13c457",
            beard: "#121215",
            nose: "#FFB6C1" // Light pink nose
        },
        yellow: {
            body: "#D28D44",
            bodyDark: "#A66D2E",
            white: "#FFFFFF",
            black: "#121215",
            collar: "#7F1D1D",
            eye: "#3F2305",
            beard: "#d18c44",
            nose: "#d18c44"
        }
    };

    const colors = palettes[variant];

    const tailVariants = {
        sitting: (i: number) => ({
            rotate: [0, 10 * (i + 1), 0, -10 * (i + 1), 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
            }
        }),
        running: (i: number) => ({
            rotate: [0, 15 * (i + 1), -15 * (i + 1), 0],
            transition: {
                duration: 0.4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.05
            }
        }),
        eating: (i: number) => ({
            rotate: [0, 5 * (i + 1), -5 * (i + 1), 0],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
            }
        })
    } as any;

    const legVariants = {
        running: (custom: number) => ({
            y: custom === 0 ? [0, -1, 0] : [-1, 0, -1],
            transition: { duration: 0.15, repeat: Infinity, ease: "linear" }
        }),
        idle: { y: 0 }
    } as any;

    const bodyVariants = {
        running: {
            y: [0, -0.6, 0],
            transition: { duration: 0.15, repeat: Infinity, ease: "linear" }
        },
        idle: { y: 0 }
    } as any;

    return (
        <motion.div
            className="relative"
            animate={state === "RUNNING" ? "running" : "idle"}
            variants={bodyVariants}
            style={{ width: 44, height: 32 }}
        >
            {/* 8x8 Pixel Grid representation for a cute 8-bit cat */}
            <svg width="44" height="32" viewBox="0 0 11 8" className="overflow-visible" style={{ shapeRendering: "crispEdges" }}>

                {/* Tail - Cohesive single piece with subtle wave */}
                <motion.g
                    style={{ originX: "8px", originY: "6.5px" }}
                    animate={
                        state === "RUNNING" ? { rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 0.4 } } :
                            state === "EATING" ? { rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 1 } } :
                                { rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                    }
                >
                    <rect x="8" y="5" width="2" height="1" fill={colors.body} />
                    <rect x="9" y="3" width="1" height="2" fill={colors.body} />
                    <rect x="8" y="2" width="1" height="1" fill={colors.body} />
                </motion.g>

                {/* Two Wide Rectangular Legs */}
                <motion.rect x="2" y="7" width="2" height="1" fill={colors.black} custom={0} variants={legVariants} />
                <motion.rect x="6" y="7" width="2" height="1" fill={colors.black} custom={1} variants={legVariants} />

                {/* Body - Rounded 8-bit Shrunk corners */}
                <rect x="3" y="4" width="4" height="3" fill={colors.body} /> {/* Main Core */}
                <rect x="2" y="5" width="6" height="1" fill={colors.body} /> {/* Horizontal rounding */}
                <rect x="2" y="6" width="6" height="1" fill={colors.bodyDark} /> {/* Shadow base */}

                {/* Collar */}
                <rect x="1" y="4" width="2" height="1" fill={colors.collar} />

                {/* Head - Rounded 8-bit */}
                <motion.g
                    animate={
                        state === "EATING" ? { y: [0, 1, 0], transition: { repeat: Infinity, duration: 0.4 } } :
                            state === "WATCHING" ? { rotate: [0, 5, 0, -5, 0], transition: { repeat: Infinity, duration: 2 } } :
                                {}
                    }
                >
                    {/* Head Core */}
                    <rect x="1" y="1" width="3" height="4" fill={colors.body} />
                    <rect x="0" y="2" width="5" height="2" fill={colors.body} /> {/* Rounding steps */}

                    {/* Ear Tips - Pointy & Rounded (Body Color Fill) */}
                    <rect x="0" y="0" width="1" height="1" fill={colors.black} /> {/* Left Tip */}
                    <rect x="1" y="0" width="1" height="1" fill={colors.body} /> {/* Left Inner */}
                    <rect x="0" y="1" width="1" height="1" fill={colors.body} /> {/* Left Inner */}

                    <rect x="4" y="0" width="1" height="1" fill={colors.black} /> {/* Right Tip */}
                    <rect x="3" y="0" width="1" height="1" fill={colors.body} /> {/* Right Inner */}
                    <rect x="4" y="1" width="1" height="1" fill={colors.body} /> {/* Right Inner */}

                    {/* Face Area (White Patch) */}
                    <rect x="1" y="3" width="3" height="1" fill={colors.white} />
                    {/* gray side box */}
                    <rect x="0" y="3" width="1" height="1" fill={colors.body} />
                    <rect x="4" y="3" width="1" height="1" fill={colors.body} />

                    <rect x="1" y="4" width="3" height="1" fill={colors.beard} />

                    {/* Eyes */}
                    {isAngry ? (
                        <g>
                            {/* Cute Angry Eyes - slanted */}
                            <rect x="1" y="2" width="1" height="1" fill={colors.eye} />
                            <rect x="3" y="2" width="1" height="1" fill={colors.eye} />
                            {/* Angry eyebrows - pixel style */}
                            <rect x="1" y="1" width="1" height="1" fill="#000000" opacity="0.5" />
                            <rect x="3" y="1" width="1" height="1" fill="#000000" opacity="0.5" />
                        </g>
                    ) : (
                        <>
                            <rect x="1" y="2" width="1" height="1" fill={colors.eye} />
                            <rect x="3" y="2" width="1" height="1" fill={colors.eye} />
                        </>
                    )}

                    {/* Mouth/Snout */}
                    <rect x="2" y="3" width="1" height="1" fill={colors.nose} />
                </motion.g>


            </svg>
        </motion.div>
    );
};

export const CatCursor = ({ variant: initialVariant }: { variant?: CatVariant }) => {
    const [catState, setCatState] = useState<CatState>("SITTING");
    const [isFishboneAttached, setIsFishboneAttached] = useState(true);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [catPos, setCatPos] = useState({ x: 200, y: 500 }); // Initial cat position
    const [isAngry, setIsAngry] = useState(false);
    const [variant] = useState<CatVariant>(() => {
        if (initialVariant) return initialVariant;
        const variants: CatVariant[] = ["gray", "black", "yellow"];
        return variants[Math.floor(Math.random() * variants.length)];
    });
    const [dust, setDust] = useState<{ id: number; x: number; y: number }[]>([]);

    const lastMousePos = useRef({ x: 0, y: 0 });
    const isMoving = useRef(false);
    const moveTimeout = useRef<NodeJS.Timeout | null>(null);
    const grabCooldown = useRef<number>(0);
    const dustIdCounter = useRef(0);

    // Smooth movement for cat
    const catX = useSpring(catPos.x, { damping: 30, stiffness: 200 });
    const catY = useSpring(catPos.y, { damping: 30, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            isMoving.current = true;
            if (moveTimeout.current) clearTimeout(moveTimeout.current);

            moveTimeout.current = setTimeout(() => {
                isMoving.current = false;
            }, 150); // Slightly longer window to detect "stopping"

            if (isFishboneAttached) {
                // If cat is not eating, it should look at or follow the cursor
                if (catState !== "EATING") {
                    const dist = Math.sqrt(
                        Math.pow(e.clientX - catPos.x, 2) + Math.pow(e.clientY - catPos.y, 2)
                    );

                    if (dist > 180) { // Increased run distance
                        setCatState("RUNNING");
                        setIsAngry(true);
                    } else if (dist > 60) {
                        setCatState("WATCHING");
                        setIsAngry(false);
                    } else {
                        setCatState("SITTING");
                        setIsAngry(false);
                    }
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [catPos, isFishboneAttached, catState]);

    // Cat follow logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (isFishboneAttached && catState === "RUNNING") {
                setCatPos(prev => {
                    const dx = mousePos.x - prev.x;
                    const dy = mousePos.y - prev.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const now = Date.now();
                    // ONLY grab if cooldown has passed AND mouse has stopped moving near cat
                    if (dist < 40 && !isMoving.current && now > grabCooldown.current) {
                        // Jump and grab!
                        setCatState("EATING");
                        setIsFishboneAttached(false);
                        setIsAngry(false);

                        // Visual jump effect using position offset
                        setCatPos(p => ({ ...p, y: p.y - 10 }));
                        setTimeout(() => setCatPos(p => ({ ...p, y: p.y + 10 })), 150);

                        return prev;
                    }

                    // Move towards mouse
                    const speed = 5;
                    // Occasionally spawn dust at the back leg
                    if (Math.random() > 0.85) {
                        const currentX = catX.get();
                        const currentY = catY.get();
                        const isFacingLeft = mousePos.x < currentX;

                        // Precise back leg placement relative to scaleX center
                        // Back leg is at x=7 in 11px wide SVG. Center is 5.5
                        // (7 - 5.5) * 4px per svg unit = 6px offset from center
                        const backLegOffset = 6;

                        setDust(prevDust => [
                            ...prevDust.slice(-10),
                            {
                                id: dustIdCounter.current++,
                                x: currentX + (isFacingLeft ? backLegOffset : -backLegOffset),
                                y: currentY + 12 // Under the feet
                            }
                        ]);
                    }

                    return {
                        x: prev.x + (dx / dist) * speed,
                        y: prev.y + (dy / dist) * speed
                    };
                });
            }
        }, 16);

        return () => clearInterval(interval);
    }, [mousePos, isFishboneAttached, catState]);

    // Dust cleanup
    useEffect(() => {
        if (dust.length === 0) return;
        const timeout = setTimeout(() => {
            setDust(prev => prev.slice(1));
        }, 800);
        return () => clearTimeout(timeout);
    }, [dust]);

    // Update animated values
    useEffect(() => {
        catX.set(catPos.x);
        catY.set(catPos.y);
    }, [catPos, catX, catY]);

    const handleInteract = () => {
        if (!isFishboneAttached) {
            // Set a 2-second cooldown where the cat cannot grab the bone again
            grabCooldown.current = Date.now() + 2000;
            setIsFishboneAttached(true);
            setCatState("RUNNING");
            setIsAngry(true);
        } else {
            // If already attached, clicking the cat makes it grab the bone immediately if close
            const dx = mousePos.x - catPos.x;
            const dy = mousePos.y - catPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                setCatState("EATING");
                setIsFishboneAttached(false);
                setIsAngry(false);

                setCatPos(p => ({ ...p, y: p.y - 10 }));
                setTimeout(() => setCatPos(p => ({ ...p, y: p.y + 10 })), 150);
            }
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Dust Particles */}
            <AnimatePresence>
                {dust.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0.8, scale: 0.5, x: p.x, y: p.y }}
                        animate={{ opacity: 0, scale: 1.5, y: p.y - 5, x: p.x + (Math.random() - 0.5) * 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="fixed text-foreground/20"
                        style={{ x: "-50%", y: "-50%" }}
                    >
                        <DustCloud />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Fishbone following cursor */}
            <AnimatePresence>
                {isFishboneAttached && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            left: mousePos.x,
                            top: mousePos.y,
                            x: "-50%",
                            y: "-50%"
                        }}
                        className="text-foreground/80 mix-blend-difference"
                    >
                        <Fishbone />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cat */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: catX,
                    top: catY,
                    x: "-50%",
                    y: "-50%"
                }}
                className="cursor-pointer pointer-events-auto group"
                onClick={handleInteract}
                animate={{
                    scaleX: mousePos.x < catPos.x ? 1 : -1
                }}
            >
                {/* Invisible larger hit area */}
                <div className="absolute inset-[-20px] rounded-full z-0" />

                <div className="relative z-10 transition-transform group-hover:scale-110 active:scale-95 duration-200">
                    <PixelCat state={catState} isAngry={isAngry} variant={variant} />

                    {/* If eating, show fishbone in front of cat */}
                    {!isFishboneAttached && catState === "EATING" && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -left-2 top-2 text-foreground/40 drop-shadow-md"
                        >
                            <Fishbone size={16} />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
