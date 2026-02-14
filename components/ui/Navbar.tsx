'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Instagram, Linkedin, QrCode, Power, FolderOpen, CodeXml, Home } from "lucide-react";
import { RxDiscordLogo } from "react-icons/rx";
import { motion } from 'motion/react';
import { useRouter, usePathname } from 'next/navigation';
import BootScreens from '../BootScreens';
import { Tooltip } from './Tooltip';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const lastScrollTop = useRef(0);
  const [status, setStatus] = useState<'idle' | 'shutting-down' | 'starting-up'>('idle');

  const showQR = () => {
    const master = document.getElementById('qr-code');
  }

  const switchOff = () => {
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

  const navLinks = [
    { href: "https://www.instagram.com/jaychauhan.exe/", icon: Instagram, tooltip: "Instagram", isExternal: true },
    { href: "https://www.x.com", icon: Linkedin, tooltip: "LinkedIn", isExternal: true },
    { href: "https://github.com/jaychauhan-exe1", icon: Github, tooltip: "GitHub", isExternal: true },
    { href: "https://discord.com/users/851376020132200459", icon: RxDiscordLogo, tooltip: "Discord", isExternal: true, size: 24 },
    { href: "/projects", icon: FolderOpen, tooltip: "Projects" },
    { href: "/components", icon: CodeXml, tooltip: "Components" },
  ];

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
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-border/20 border p-2 rounded-full border-border dark:border-border backdrop-blur-sm z-50 pointer-events-auto"
        style={{ transformOrigin: 'center bottom' }}
      >
        <Tooltip content="QR Code">
          <a onClick={showQR} className="bg-transparent p-2 rounded-full w-fit cursor-pointer hover:bg-border transition-colors duration-300 ease-out">
            <QrCode className="text-foreground" />
          </a>
        </Tooltip>

        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = isActive ? Home : link.icon;
          const href = isActive ? "/" : link.href;

          return (
            <Tooltip key={link.tooltip} content={isActive ? "Home" : link.tooltip}>
              <a
                href={href}
                target={link.isExternal ? "_blank" : undefined}
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
    </>
  );
}
