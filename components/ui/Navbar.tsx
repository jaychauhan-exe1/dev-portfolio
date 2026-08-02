'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Github, Dribbble, QrCode, Home, Folder, PenLine, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, usePathname } from 'next/navigation';
import { Tooltip } from './Tooltip';
import { GenieModal } from './GenieModal';
import Image from 'next/image';
import Link from 'next/link';
import { RiLinkedinLine } from 'react-icons/ri';

export const Navbar = ({ className, isDemo = false }: { className?: string, isDemo?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrOrigin, setQrOrigin] = useState({ x: 0, y: 0 });
  const lastScrollTop = useRef(0);

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

      if (isHovering || isForcedHidden) {
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
  }, [isHovering, isForcedHidden]);

  const baseNavLinks = [
    { href: "https://dribbble.com/jaychauhanexe", icon: Dribbble, tooltip: "Dribbble", isExternal: true },
    { href: "https://github.com/jaychauhan-exe1", icon: Github, tooltip: "GitHub", isExternal: true },
    { href: "https://linkedin.com/in/jaychauhanexe", icon: RiLinkedinLine, tooltip: "LinkedIn", isExternal: true, size: 24 },
    { href: "/projects", icon: Folder, tooltip: "Projects", isExternal: false },
    { href: "/blog", icon: PenLine, tooltip: "Blog", isExternal: false },
  ];

  const navLinks = isDemo ? baseNavLinks.filter(l => l.isExternal) : baseNavLinks;

  const showBackButton = !isDemo && pathname !== '/';

  return (
    <>
      <motion.div
        layout
        ref={navRef}
        onMouseEnter={() => { setIsHovering(true); if (!isForcedHidden) setIsVisible(true); }}
        onMouseLeave={() => setIsHovering(false)}
        initial={false}
        animate={{
          y: (isVisible && !isForcedHidden) ? 0 : (isForcedHidden ? 100 : 20),
          opacity: (isVisible && !isForcedHidden) ? 1 : (isForcedHidden ? 0 : 0.5),
          scale: (isVisible && !isForcedHidden) ? 1 : 0.98,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 150,
          layout: { type: 'spring', stiffness: 300, damping: 30 }
        }}
        className={className || "fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center z-50 pointer-events-auto"}
        style={{ transformOrigin: 'center bottom' }}
      >
        {/* Back Button (Left Arrow) */}
        <AnimatePresence initial={false}>
          {showBackButton && (
            <motion.div
              layout
              key="back-button"
              initial={{ opacity: 0, x: 20, filter: "blur(4px)", width: 0, marginRight: 0 }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)", width: "auto", marginRight: 16 }}
              exit={{ opacity: 0, x: 20, filter: "blur(4px)", width: 0, marginRight: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className=""
            >

              <div className="bg-background/60 border p-2 rounded-full border-border dark:border-border backdrop-blur-[2px] shadow-sm shrink-0 w-14 h-14 flex items-center justify-center">
                <Tooltip content="Go Back">
                  <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:shadow-[inset_0_0_4px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_4px_2px_rgba(255,255,255,0.1)] transition-colors duration-300 ease-out flex items-center justify-center w-full h-full cursor-pointer bg-transparent border-none"
                  >
                    <ArrowLeft size={24} className="text-foreground" />
                  </button>
                </Tooltip>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar */}
        <motion.div
          layout
          className="flex items-center gap-2 bg-background/60 border p-2 rounded-full border-border dark:border-border backdrop-blur-[2px] shadow-sm"
        >
          <Tooltip content="QR Code">
            <button
              type="button"
              onClick={showQR}
              className={`p-2 rounded-full w-fit hover:shadow-[inset_0_0_4px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_4px_2px_rgba(255,255,255,0.1)] transition-colors duration-300 ease-out bg-transparent border-none ${isDemo ? "cursor-default" : "cursor-pointer"}`}
            >
              <QrCode className="text-foreground" />
            </button>
          </Tooltip>

          {navLinks.map((link) => {
            const isActive = !isDemo && pathname === link.href;
            const Icon = isActive ? Home : link.icon;
            const href = isDemo ? undefined : (isActive ? "/" : link.href);
            const className = `hover:shadow-[inset_0_0_4px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_4px_2px_rgba(255,255,255,0.1)] p-2 rounded-full w-fit transition-colors duration-300 ease-out ${isDemo ? "cursor-default" : "cursor-pointer"}`;

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
        </motion.div>

      </motion.div>
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
