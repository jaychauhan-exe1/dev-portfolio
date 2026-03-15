'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Instagram, Dribbble, QrCode, Power, FolderOpen, CodeXml, Home, X } from "lucide-react";
import { RxDiscordLogo } from "react-icons/rx";
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, usePathname } from 'next/navigation';
import BootScreens from '../BootScreens';
import { Tooltip } from './Tooltip';

export const Navbar = ({ className, isDemo = false }: { className?: string, isDemo?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const [status, setStatus] = useState<'idle' | 'shutting-down' | 'starting-up'>('idle');

  const showQR = () => {
    setIsQRModalOpen(true);
  }

  const switchOff = () => {
    // Abort actual redirection inside component playground
    if (isDemo || className) return;

    const master = document.getElementById('master-container');

    if (status !== 'idle') return;

    // Start transition
    const isMainPage = pathname === '/';
    const nextStatus = isMainPage ? 'shutting-down' : 'starting-up';

    setStatus(nextStatus);
    master?.classList.add('overflow-hidden', 'h-screen');
    setIsVisible(true);
    setIsHovering(true);

    timeoutRef.current = setTimeout(() => {
      router.push(isMainPage ? '/plain' : '/');
      setTimeout(() => {
        setStatus('idle');
        master?.classList.remove('overflow-hidden', 'h-screen');
      }, 100);
    }, 1000);
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

      if (isHovering || status !== 'idle') {
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
  }, [isHovering, status]);

  const baseNavLinks = [
    { href: "https://www.instagram.com/jaychauhan.exe/", icon: Instagram, tooltip: "Instagram", isExternal: true },
    { href: "https://dribbble.com/jaychauhanexe", icon: Dribbble, tooltip: "Dribbble", isExternal: true },
    { href: "https://github.com/jaychauhan-exe1", icon: Github, tooltip: "GitHub", isExternal: true },
    { href: "https://discord.com/users/851376020132200459", icon: RxDiscordLogo, tooltip: "Discord", isExternal: true, size: 24 },
    { href: "/projects", icon: FolderOpen, tooltip: "Projects" },
    { href: "/components", icon: CodeXml, tooltip: "Components" },
  ];

  const navLinks = isDemo ? baseNavLinks.filter(l => l.isExternal) : baseNavLinks;

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
        className={className || "fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-border/20 border p-2 rounded-full border-border dark:border-border backdrop-blur-sm z-50 pointer-events-auto"}
        style={{ transformOrigin: 'center bottom' }}
      >
        <Tooltip content="QR Code">
          <a onClick={showQR} className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
            <QrCode className="text-foreground" />
          </a>
        </Tooltip>

        {navLinks.map((link) => {
          const isActive = !isDemo && pathname === link.href;
          const Icon = isActive ? Home : link.icon;
          const href = isDemo ? "#" : (isActive ? "/" : link.href);

          return (
            <Tooltip key={link.tooltip} content={isActive ? "Home" : link.tooltip}>
              <a
                href={href}
                target={(!isDemo && link.isExternal) ? "_blank" : undefined}
                className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out"
              >
                <Icon size={link.size || 24} className="text-foreground" />
              </a>
            </Tooltip>
          );
        })}

        <Tooltip content={"Power"}>
          <a onClick={switchOff} className="power-btn bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
            <Power className="text-foreground" />
          </a>
        </Tooltip>
      </motion.div>
      <BootScreens status={status} />

      <AnimatePresence>
        {isQRModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/20 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsQRModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.5
              }}
              className="relative p-6 pt-10 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-2xl pointer-events-auto flex flex-col items-center gap-4 dark:shadow-black/50 overflow-hidden min-w-[300px]"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
              }}
            >
              {/* macOS style window buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  onClick={() => setIsQRModalOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
                >
                  <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="mt-2 text-center flex flex-col items-center w-full">
                <h2 className="text-xl font-semibold mb-1">Scan Me</h2>
                <p className="text-sm text-foreground/60 mb-6 font-medium">Scan to view on your mobile device</p>
                <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-200 w-full flex justify-center">
                  <QrCode size={180} className="text-black" strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
