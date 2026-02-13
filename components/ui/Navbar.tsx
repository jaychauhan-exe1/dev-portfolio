'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Instagram, Linkedin, QrCode, Power } from "lucide-react";
import { RxDiscordLogo } from "react-icons/rx";
import Link from 'next/link';

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followPos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const lastScrollTop = useRef(0);
  const [powerOff, setPowerOff] = useState(false);

  const switchOff = () => {
    const nextPowerOff = !powerOff;
    setPowerOff(nextPowerOff);

    const raw = document.getElementById('raw');
    const master = document.getElementById('master-container');

    if (nextPowerOff) {
      // If powerOff is true: slide raw to top-0 and hide overflow
      raw?.classList.remove('top-full');
      raw?.classList.add('top-0');
      master?.classList.add('overflow-hidden', 'h-screen');
      setIsVisible(true);
      setIsHovering(true)
    } else {
      // If powerOff is false: slide raw back to top-full and restore overflow
      raw?.classList.remove('top-0');
      raw?.classList.add('top-full');
      master?.classList.remove('overflow-hidden', 'h-screen');
      // On power on, we might want it visible
      setIsVisible(true);
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mousePos.current = {
          x: e.clientX - rect.left - 12,
          y: e.clientY - rect.top - 12,
        };
      }
    };

    const handleScroll = () => {
      const st = window.scrollY;

      // Don't hide if we are hovering
      if (isHovering) {
        lastScrollTop.current = st <= 0 ? 0 : st;
        return;
      }

      if (st > lastScrollTop.current && st > 50) {
        // Scrolling DOWN - hide it
        setIsVisible(false);
      } else if (st < lastScrollTop.current || st <= 50) {
        // Scrolling UP or near the top - show it
        setIsVisible(true);
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
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
    window.addEventListener('scroll', handleScroll);
    if (hoverAreaRef.current) {
      hoverAreaRef.current.addEventListener('mouseenter', handleMouseEnter);
      hoverAreaRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (hoverAreaRef.current) {
        hoverAreaRef.current.removeEventListener('mouseenter', handleMouseEnter);
        hoverAreaRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  return (
    <div
      ref={hoverAreaRef}
      className={`fixed w-fit max-w-lg left-1/2 -translate-x-1/2 transition-all duration-300 ease-out flex flex-col items-center z-50 pointer-events-auto ${isVisible ? '-bottom-10' : '-bottom-28'}`}
    >
      <div
        ref={navRef}
        className="w-full shadow-md bg-border/20 border p-2 rounded-full overflow-hidden border-border dark:border-border backdrop-blur-xs relative pointer-events-auto"
      >
        <div className="flex items-center gap-2">

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
        </div>
        <div
          ref={followRef}
          className="follow absolute w-6 h-6 rounded-full bg-primary blur-lg pointer-events-none"
        >
        </div>
      </div>

      <div className="h-20 w-full" />
    </div>
  )
}
