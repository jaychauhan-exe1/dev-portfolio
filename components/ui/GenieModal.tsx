import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X } from "lucide-react";

interface GenieModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin: { x: number; y: number };
  title?: string;
  children: React.ReactNode;
}

export function GenieModal({ isOpen, onClose, origin, title, children }: GenieModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/20 backdrop-blur-sm pointer-events-auto"
            style={{ willChange: "opacity" }}
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.01,
              x: origin.x,
              y: origin.y,
              scaleX: 0.2
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              scaleX: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.01,
              x: origin.x,
              y: origin.y,
              scaleX: 0.2
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative p-8 rounded-3xl bg-background/40 backdrop-blur-lg border border-border shadow-2xl pointer-events-auto flex flex-col items-center gap-4 dark:shadow-border/20 overflow-hidden min-w-[300px]"
            style={{
              transformOrigin: "center center",
              willChange: "transform, opacity"
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-border/50 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="mt-2 flex flex-col items-center w-full">
              {title && <h2 className="text-xl font-semibold mb-6">{title}</h2>}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
