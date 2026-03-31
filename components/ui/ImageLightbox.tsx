"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const lightboxContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-6 md:p-24"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative flex flex-col items-center justify-center pointer-events-auto w-[92vw] md:w-[70vw] max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] border border-border/50 bg-background/50 ring-1 ring-inset ring-white/10 group/lightbox-img">
              {/* Close Button - Now inside the image to prevent clipping on small screens */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2.5 md:p-3 bg-white rounded-full text-black/70 hover:text-black hover:bg-white/90 transition-all duration-300 shadow-xl border border-black/5 z-[102]"
                aria-label="Close"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <img
                src={src}
                alt={alt}
                className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain block mx-auto select-none"
              />
            </div>

            {/* Caption */}
            {alt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 md:mt-8 text-center px-4"
              >
                <span className="inline-block text-[9px] md:text-[10px] text-foreground/50 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold bg-foreground/5 px-4 py-2 rounded-2xl md:rounded-full backdrop-blur-sm border border-border/30 max-w-full leading-relaxed">
                  {alt}
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in h-full w-full block group/lightbox relative"
      >
        {children}
      </div>
      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}

