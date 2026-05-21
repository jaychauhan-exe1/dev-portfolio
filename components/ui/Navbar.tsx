'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Dribbble, QrCode, Power, CodeXml, Home, Folder, PenLine } from "lucide-react";
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, usePathname } from 'next/navigation';
import BootScreens from '../BootScreens';
import { Tooltip } from './Tooltip';
import { GenieModal } from './GenieModal';
import Image from 'next/image';
import Link from 'next/link';
import { RiLinkedinLine } from 'react-icons/ri';

export const Navbar = ({ className, isDemo = false }: { className?: string, isDemo?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrOrigin, setQrOrigin] = useState({ x: 0, y: 0 });
  const lastScrollTop = useRef(0);
  const [status, setStatus] = useState<'idle' | 'shutting-down' | 'starting-up'>('idle');

  const showQR = (e: React.MouseEvent<HTMLElement>) => {
    if (isDemo) return;
    // Record the exact center of the clicked icon relative to the screen center for the Genie out/in effect
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    setQrOrigin({
      x: (rect.left + rect.width / 2) - centerX,
      y: (rect.top + rect.height / 2) - centerY,
    });
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

  const [isForcedHidden, setIsForcedHidden] = useState(false);

  useEffect(() => {
    const handleToggle = (e: any) => setIsForcedHidden(e.detail.hidden);
    window.addEventListener('hideNavbar', handleToggle as EventListener);
    return () => window.removeEventListener('hideNavbar', handleToggle as EventListener);
  }, []);

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

      if (isHovering || status !== 'idle' || isForcedHidden) {
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
  }, [isHovering, status, isForcedHidden]);

  const baseNavLinks = [
    { href: "https://dribbble.com/jaychauhanexe", icon: Dribbble, tooltip: "Dribbble", isExternal: true },
    { href: "https://github.com/jaychauhan-exe1", icon: Github, tooltip: "GitHub", isExternal: true },
    { href: "https://linkedin.com/in/jaychauhanexe", icon: RiLinkedinLine, tooltip: "LinkedIn", isExternal: true, size: 24 },
    { href: "/projects", icon: Folder, tooltip: "Projects", isExternal: false },
    { href: "/blog", icon: PenLine, tooltip: "Blog", isExternal: false },
    { href: "/components", icon: CodeXml, tooltip: "Components", isExternal: false },
  ];

  const navLinks = isDemo ? baseNavLinks.filter(l => l.isExternal) : baseNavLinks;

  return (
    <>
      <motion.div
        ref={navRef}
        onMouseEnter={() => { setIsHovering(true); if (!isForcedHidden) setIsVisible(true); }}
        onMouseLeave={() => setIsHovering(false)}
        initial={false}
        animate={{
          y: (isVisible && !isForcedHidden) ? 0 : (isForcedHidden ? 100 : 20),
          opacity: (isVisible && !isForcedHidden) ? 1 : (isForcedHidden ? 0 : 0.5),
          scale: (isVisible && !isForcedHidden) ? 1 : 0.98,
          boxShadow: (isVisible && !isForcedHidden) ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className={className || "fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/50 border p-2 rounded-full border-border dark:border-border backdrop-blur-sm z-50 pointer-events-auto"}
        style={{ transformOrigin: 'center bottom' }}
      >
        <Tooltip content="QR Code">
          <button
            type="button"
            onClick={showQR}
            className={`p-2 rounded-full w-fit hover:bg-border transition-colors duration-300 ease-out bg-transparent border-none ${isDemo ? "cursor-default" : "cursor-pointer"}`}
          >
            <QrCode className="text-foreground" />
          </button>
        </Tooltip>

        {navLinks.map((link) => {
          const isActive = !isDemo && pathname === link.href;
          const Icon = isActive ? Home : link.icon;
          const href = isDemo ? undefined : (isActive ? "/" : link.href);
          const className = `p-2 rounded-full w-fit hover:bg-border transition-colors duration-300 ease-out ${isDemo ? "cursor-default" : "cursor-pointer"}`;

          if (isDemo) {
            return (
              <Tooltip key={link.tooltip} content={link.tooltip}>
                <div className={className}>
                  <Icon size={link.size || 24} className="text-foreground" />
                </div>
              </Tooltip>
            );
          }

          return (
            <Tooltip key={link.tooltip} content={isActive ? "Home" : link.tooltip}>
              {link.isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <Icon size={link.size || 24} className="text-foreground" />
                </a>
              ) : (
                <Link
                  href={href || "/"}
                  className={className}
                >
                  <Icon size={link.size || 24} className="text-foreground" />
                </Link>
              )}
            </Tooltip>
          );
        })}

        <AnimatePresence>
          {!isDemo && (pathname === '/' || pathname === '/plain') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.5, width: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <Tooltip content={"Power"}>
                <button
                  type="button"
                  onClick={switchOff}
                  className={`power-btn p-2 rounded-full w-fit hover:bg-border transition-colors duration-300 ease-out bg-transparent border-none ${isDemo ? "cursor-default" : "cursor-pointer"}`}
                >
                  <Power className="text-foreground" />
                </button>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
      <BootScreens status={status} />
      <GenieModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        origin={qrOrigin}
        title="Scan Me"
      >
        <div className="p-4 bg-background rounded-xl shadow-inner border border-border w-full flex justify-center max-w-[300px] min-w-[300px]">
          <Image src="/QRCode.webp" alt="QR Code" width={300} height={300} />
        </div>
      </GenieModal>

    </>
  );
}
