"use client"
import React, { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
export type ExperienceItem = {
  title: string;
  year?: string | null;
  description?: string;
};

type Props = {
  items: ExperienceItem[];
};

export default function ExpandableContent({ items }: Props) {
  if (!items || items.length === 0) return null;

    function ExperienceCard({ item, idx }: { item: ExperienceItem; idx: number }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [maxH, setMaxH] = useState<string | number>("none");

    const ANIM_DURATION = 300; // ms
    const ANIM_EASING = "ease-in-out";
    const COLLAPSED_PX = 72;

    // initialize collapsed max height on mount
    useEffect(() => {
      if (contentRef.current) {
        const full = contentRef.current.scrollHeight;
        const collapsed = Math.min(full, COLLAPSED_PX);
        setMaxH(collapsed);
        if (wrapperRef.current) wrapperRef.current.style.overflow = "hidden";
      }
    }, []);

    return (
      <div key={`${item.title}-${idx}`} className="mb-4 mt-6">
        <div className="flex justify-between items-center">
          <h5 className=" text-foreground text-lg tracking-wide">{item.title}</h5>
          {item.year && (
            <span className="text-foreground/50 text-sm font-cabin-sketch tracking-wide md:tracking-widest">{item.year}</span>
          )}
        </div>

        {item.description && (
          <div className="mb-6">
            <div
              ref={wrapperRef}
              className="relative mt-2"
              onTransitionEnd={(e: React.TransitionEvent<HTMLDivElement>) => {
                if (e.propertyName !== "max-height") return;
                if (open) {
                  // expanded: keep a stable pixel max-height equal to current content height
                  if (contentRef.current) {
                    const full = contentRef.current.scrollHeight;
                    setMaxH(full);
                  }
                  if (wrapperRef.current) wrapperRef.current.style.overflow = "visible";
                } else {
                  // collapsed: ensure overflow hidden to clip overlay
                  if (wrapperRef.current) wrapperRef.current.style.overflow = "hidden";
                }
              }}
              style={{
                maxHeight: maxH === "none" ? "none" : typeof maxH === "number" ? `${maxH}px` : maxH,
                overflow: "hidden",
                transition: `max-height ${ANIM_DURATION}ms ${ANIM_EASING}`,
              }}
            >
              <p ref={contentRef} className="text-foreground/60 text-sm tracking-wide">
                {item.description}
              </p>

              {/* overlay gradient that moves out when expanded */}
              <div
                className={`absolute left-0 w-full h-[30%] bg-linear-to-t from-background via-background/60 to-transparent transform`}
                style={{
                  bottom: 0,
                  transform: open ? "translateY(100%)" : "translateY(0)",
                  opacity: open ? 0 : 1,
                  pointerEvents: "none",
                  transition: `transform ${ANIM_DURATION}ms ${ANIM_EASING}, opacity ${ANIM_DURATION}ms ${ANIM_EASING}`,
                }}
              />
            </div>

            <button
              onClick={() => {
                if (!contentRef.current || !wrapperRef.current) {
                  setOpen((s) => !s);
                  return;
                }

                const full = contentRef.current.scrollHeight;
                const collapsed = Math.min(full, COLLAPSED_PX);

                if (!open) {
                  // Opening: start from collapsed height, then animate to full
                  setMaxH(collapsed);
                  if (wrapperRef.current) wrapperRef.current.style.overflow = "hidden";
                  // force reflow so transition has a starting point
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  wrapperRef.current.offsetHeight;
                  // start overlay animation
                  setOpen(true);
                  // in next frame set to full height to trigger transition
                  requestAnimationFrame(() => setMaxH(full));
                } else {
                  // Closing: set maxHeight to current scrollHeight first to have a smooth collapse
                  const current = contentRef.current.scrollHeight;
                  setMaxH(current);
                  // force reflow
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  wrapperRef.current.offsetHeight;

                  // start overlay/button animation immediately and ensure clipping during collapse
                  setOpen(false);
                  if (wrapperRef.current) wrapperRef.current.style.overflow = "hidden";

                  // then in next frame set target collapsed height to trigger transition
                  requestAnimationFrame(() => setMaxH(collapsed));
                }
              }}
              className="cursor-pointer hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2 mt-2 text-foreground/60"
              aria-expanded={open}
            >
              {open ? "View Less" : "View More"}
              <ChevronsUpDown size={12} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return <div>{items.map((it, i) => <ExperienceCard key={`${it.title}-${i}`} item={it} idx={i} />)}</div>;
}
