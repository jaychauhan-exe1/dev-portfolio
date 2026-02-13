'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Instagram, Linkedin, QrCode, Power } from "lucide-react";
import { RxDiscordLogo } from "react-icons/rx";
import { RawData } from '../RawData';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const lastScrollTop = useRef(0);
  const [powerOff, setPowerOff] = useState(false);

  // Mouse follow logic using motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the follow bubble
  const springConfig = { damping: 20, stiffness: 300 };
  const bubbleX = useSpring(mouseX, springConfig);
  const bubbleY = useSpring(mouseY, springConfig);

  const switchOff = () => {
    const nextPowerOff = !powerOff;
    setPowerOff(nextPowerOff);

    const master = document.getElementById('master-container');
    if (nextPowerOff) {
      master?.classList.add('overflow-hidden', 'h-screen');
      setIsVisible(true);
      setIsHovering(true);
    } else {
      master?.classList.remove('overflow-hidden', 'h-screen');
      setIsVisible(true);
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - 12);
        mouseY.set(e.clientY - rect.top - 12);
      }
    };

    const handleScroll = () => {
      const st = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );

      const isAtBottom = windowHeight + st >= fullHeight - 20;

      if (isHovering || powerOff) {
        lastScrollTop.current = st <= 0 ? 0 : st;
        return;
      }

      if (isAtBottom) {
        setIsVisible(true);
      } else if (st > lastScrollTop.current && st > 50) {
        setIsVisible(false);
      } else if (st < lastScrollTop.current || st <= 50) {
        setIsVisible(true);
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHovering, powerOff]);

  return (
    <>
      <motion.div
        ref={navRef}
        onMouseEnter={() => { setIsHovering(true); setIsVisible(true); }}
        onMouseLeave={() => setIsHovering(false)}
        initial={false}
        animate={{
          y: isVisible ? 0 : 20,
          opacity: isVisible ? 1 : 0.5,
          scale: isVisible ? 1 : 0.98,
          boxShadow: isVisible ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-border/20 border p-2 rounded-full border-border dark:border-border backdrop-blur-sm z-50 pointer-events-auto overflow-hidden"
        style={{ transformOrigin: 'center bottom' }}
      >
        <a href="" className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <QrCode className="text-foreground" />
        </a>
        <a className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <Instagram className="text-foreground" />
        </a>
        <a className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <Linkedin className="text-foreground" />
        </a>
        <a className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <Github className="text-foreground" />
        </a>
        <a className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <RxDiscordLogo size={24} className="text-foreground" />
        </a>
        <a onClick={switchOff} className="power-btn bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
          <Power className="text-foreground" />
        </a>

        <motion.div
          style={{ left: bubbleX, top: bubbleY }}
          className="absolute w-6 h-6 rounded-full bg-primary blur-lg pointer-events-none -z-1"
        />
      </motion.div>

      <AnimatePresence>
        {powerOff && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="z-40 pt-0 md:pt-20 fixed top-0 left-1/2 -translate-x-1/2 bg-background h-screen w-full max-w-2xl overflow-y-auto"
          >
            <RawData />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
