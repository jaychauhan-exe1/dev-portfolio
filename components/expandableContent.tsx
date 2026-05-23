"use client"
import React, { useState } from "react";
import { ChevronsUpDown, Link } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

export type ExperienceItem = {
  title: string;
  year?: string | null;
  description?: string;
  link?: string;
  thumbnail?: string;
  blurThumbnail?: boolean;
};

type Props = {
  items: ExperienceItem[];
};

function ExperienceCard({ item, idx }: { item: ExperienceItem; idx: number }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);
  const COLLAPSED_PX = 72;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!item.thumbnail) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const showImage = isHovered && !isOverLink && item.thumbnail;

  return (
    <div
      key={`${item.title}-${idx}`}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOverLink(false);
      }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {showImage && (
          <motion.div
            style={{
              left: smoothX,
              top: smoothY,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-50 w-56 aspect-video overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className={`w-full h-full object-cover ${item.blurThumbnail ? "blur-[0px] scale-105" : ""}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <motion.div className="group pr-6" whileHover="hover">
          <h5 className="relative text-foreground text-lg tracking-wide">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-foreground/20 decoration-1 underline hover:decoration-foreground transition-colors duration-300 ease-out"
                onMouseEnter={() => setIsOverLink(true)}
                onMouseLeave={() => setIsOverLink(false)}
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
            {item.link && (
              <motion.a
                variants={{
                  initial: { opacity: 0, x: -10, scale: 0.8, rotate: -15 },
                  hover: { opacity: 1, x: 26, scale: 1, rotate: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bg-transparent opacity-0 hover:bg-border/40 p-1.5 rounded-full top-1/2 -translate-y-1/2 right-0 flex items-center justify-center transition-colors duration-200"
                onMouseEnter={() => setIsOverLink(true)}
                onMouseLeave={() => setIsOverLink(false)}
              >
                <Link size={12} className="text-foreground" />
              </motion.a>
            )}
          </h5>
        </motion.div>

        {item.year && (
          <span className="text-foreground/50 text-sm font-cabin-sketch tracking-wide md:tracking-widest">{item.year}</span>
        )}
      </div>

      {item.description && (
        <div>
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : COLLAPSED_PX }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative mt-2 overflow-hidden"
          >
            <p className="text-foreground/60 text-sm tracking-wide whitespace-pre-line">
              {item.description}
            </p>

            <AnimatePresence>
              {!open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-0 w-full h-[60%] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            onClick={() => setOpen(!open)}
            className="cursor-pointer hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2 mt-2 text-foreground/60"
            aria-expanded={open}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsOverLink(true)}
            onMouseLeave={() => setIsOverLink(false)}
          >
            {open ? "View Less" : "View More"}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronsUpDown size={12} />
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default function ExpandableContent({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex gap-8 flex-col">
      {items.map((it, i) => (
        <ExperienceCard key={`${it.title}-${i}`} item={it} idx={i} />
      ))}
    </div>
  );
}
