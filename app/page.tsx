"use client";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type ExperienceItem = {
  title: string;
  year?: string | null;
  description?: string;
  link?: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const data = {
  experience: [
    {
      title: "Freelance - Fiverr",
      year: "2021 - 2024",
      description:
        "I began my freelancing journey on Fiverr in 2021, and since then I have successfully completed over 100 projects while maintaining a consistent 5-star rating. Throughout this experience, I've had the opportunity to collaborate with clients from around the world, gaining valuable exposure to diverse business needs, workflows, and expectations. My work spans a wide range of industries, including e-commerce, healthcare, education, and pharmaceuticals.",
      link: "https://www.fiverr.com/jaychauhan123",
    },
    {
      title: "Graphics & UI/UX Designer",
      year: "2024",
      description:
        "I worked as a Graphic Design Intern at Brand Insights Mafia, a digital marketing agency, where I contributed to creating visual content for social media, marketing campaigns, and branding projects. I gained hands-on experience working with real client requirements, tight deadlines, and collaborative feedback.",
      link: "https://www.insightsmafia.com",
    },
    {
      title: "Aciony Studios - Building",
      year: "2026 - BREWING",
      description:
        "In 2026, I founded Aciony Studios with the goal of bringing together everything I've learned from years of freelancing into one place. Through this studio, I aim to provide businesses with complete, all-in-one solutions — from design and branding to web apps, custom systems, automations, marketing support, and social media management.",
    },
  ],
  projects: [
    {
      title: "Business Reports",
      link: "https://github.com/jaychauhan-exe1/better-reports",
      year: "NEXT JS",
      description:
        "Better Reports is a business analytics dashboard I built to help businesses understand their data in a clear and practical way. It allows users to compare sales in multiple formats, generate invoices, and view performance insights through clean visual reports.",
    },
    {
      title: "Sales Mobility App",
      link: "https://github.com/jaychauhan-exe1/bettermobility",
      year: "EXPO APP",
      description:
        "Sales Mobility App is a field sales management system I built to replace manual, paper-based workflows with a streamlined digital solution. It supports real-time invoice generation with portable printer integration.",
    },
    {
      title: "Think File",
      link: "https://think-file.vercel.app",
      year: "GEN AI",
      description:
        "ThinkFile is a Retrieval-Augmented Generation (RAG) system I built to explore and deepen my understanding of generative AI systems. It allows users to upload and interact with their data through AI-powered conversations.",
    },
  ],
};

const techStack = {
  frontEnd: ["React JS", "Next JS", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
  backEnd: ["Node JS", "MongoDB", "PostgresSQL", "Firebase"],
  language: ["Javascript", "Typescript", "Python", "C++", "PHP"],
  tools: ["Git", "GitHub", "Cursor", "Docker", "Claude", "Gemini"],
  design: ["Figma"],
  deployment: ["Vercel", "Google Cloud", "Netlify"],
};

// ─── Win2K UI Primitives ──────────────────────────────────────────────────────

function Win2KButton({
  children,
  onClick,
  className = "",
  small = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  small?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className={`${className} ${small ? "px-2 py-0.5 text-xs" : "px-4 py-1 text-xs"} font-win bg-win-btn border-win-out active:border-win-in select-none cursor-pointer`}
      style={{
        borderStyle: "solid",
        borderWidth: pressed ? "2px" : "2px",
        borderColor: pressed
          ? "#808080 #ffffff #ffffff #808080"
          : "#ffffff #808080 #808080 #ffffff",
        background: "#d4d0c8",
        color: "#000000",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TitleBar({
  title,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  active = true,
}: {
  title: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  active?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-1.5 py-1 select-none"
      style={{
        background: active
          ? "linear-gradient(to right, #0a246a, #a6caf0)"
          : "linear-gradient(to right, #7f7f7f, #bfbfbf)",
        height: "22px",
      }}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="flex items-center">{icon}</span>}
        <span
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            fontWeight: "bold",
            color: "#ffffff",
            textShadow: "1px 1px 0 #000000aa",
          }}
        >
          {title}
        </span>
      </div>
      <div className="flex items-center gap-0.5">
        {onMinimize && (
          <Win2KButton small onClick={onMinimize} className="!w-[16px] !h-[14px] !p-0 flex items-center justify-center text-center leading-none">
            _
          </Win2KButton>
        )}
        {onMaximize && (
          <Win2KButton small onClick={onMaximize} className="!w-[16px] !h-[14px] !p-0 flex items-center justify-center text-center leading-none">
            □
          </Win2KButton>
        )}
        {onClose && (
          <Win2KButton small onClick={onClose} className="!w-[16px] !h-[14px] !p-0 flex items-center justify-center text-center leading-none font-bold">
            ✕
          </Win2KButton>
        )}
      </div>
    </div>
  );
}

function Win2KWindow({
  title,
  icon,
  children,
  className = "",
  defaultMinimized = false,
  canClose = false,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultMinimized?: boolean;
  canClose?: boolean;
}) {
  const [minimized, setMinimized] = useState(defaultMinimized);
  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <div
        className="win2k-window p-2 cursor-pointer"
        style={{ display: "inline-block" }}
        onClick={() => setClosed(false)}
      >
        <div className="flex flex-col items-center gap-1">
          <span style={{ fontSize: "32px" }}>🖥️</span>
          <span style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: "#000" }}>
            {title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`win2k-window ${className}`}
      style={{ border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff" }}
    >
      <TitleBar
        title={title}
        icon={icon}
        onMinimize={() => setMinimized(!minimized)}
        onMaximize={undefined}
        onClose={canClose ? () => setClosed(true) : undefined}
        active
      />
      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuBar({ items }: { items: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className="flex items-center gap-0 px-1"
      style={{
        background: "#d4d0c8",
        borderBottom: "1px solid #808080",
        height: "20px",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
      }}
    >
      {items.map((item) => (
        <button
          key={item}
          onMouseDown={() => setActive(item)}
          onMouseUp={() => setActive(null)}
          onMouseLeave={() => setActive(null)}
          className="px-2 py-0 cursor-default select-none"
          style={{
            background: active === item ? "#0a246a" : "transparent",
            color: active === item ? "#fff" : "#000",
            border: "none",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            height: "18px",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function StatusBar({ left, right }: { left: string; right?: string }) {
  return (
    <div
      className="flex items-center justify-between px-2"
      style={{
        background: "#d4d0c8",
        borderTop: "1px solid #808080",
        height: "20px",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
        color: "#000",
      }}
    >
      <span
        style={{
          border: "1px inset #808080",
          padding: "0 4px",
          borderColor: "#808080 #ffffff #ffffff #808080",
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        {left}
      </span>
      {right && (
        <span
          style={{
            border: "1px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            padding: "0 4px",
          }}
        >
          {right}
        </span>
      )}
    </div>
  );
}

function Win2KTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex items-end gap-0.5 px-1 pt-1" style={{ background: "#d4d0c8" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            padding: "2px 10px",
            background: active === tab ? "#d4d0c8" : "#bbb",
            border: "2px solid",
            borderColor:
              active === tab
                ? "#ffffff #808080 #d4d0c8 #ffffff"
                : "#ffffff #808080 #808080 #ffffff",
            borderBottom: active === tab ? "2px solid #d4d0c8" : "2px solid #808080",
            cursor: "default",
            marginBottom: active === tab ? "-1px" : "0",
            zIndex: active === tab ? 2 : 1,
            position: "relative",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function Win2KInset({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        border: "2px solid",
        borderColor: "#808080 #ffffff #ffffff #808080",
        background: "#ffffff",
        padding: "4px",
      }}
    >
      {children}
    </div>
  );
}

// ─── Expandable Experience Item ───────────────────────────────────────────────
function ExpRow({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #d4d0c8",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
        padding: "4px 0",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span style={{ color: "#0000ee", textDecoration: item.link ? "underline" : "none", cursor: item.link ? "pointer" : "default" }}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#0000ee" }}>
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </span>
          {item.year && (
            <span style={{ color: "#808080", fontSize: "10px" }}>[{item.year}]</span>
          )}
        </div>
        {item.description && (
          <Win2KButton small onClick={() => setOpen(!open)}>
            {open ? "▲ Less" : "▼ More"}
          </Win2KButton>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && item.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <Win2KInset className="mt-2">
              <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: "#000", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                {item.description}
              </p>
            </Win2KInset>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Draggable Window Wrapper ─────────────────────────────────────────────────
function DraggableWin({
  title,
  icon,
  children,
  defaultPos,
  className = "",
  zBase = 10,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultPos: { x: number; y: number };
  className?: string;
  zBase?: number;
}) {
  const controls = useAnimation();
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      animate={controls}
      initial={{ x: defaultPos.x, y: defaultPos.y }}
      whileDrag={{ zIndex: 999 }}
      style={{
        position: "absolute",
        zIndex: zBase,
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        background: "#d4d0c8",
        minWidth: "260px",
      }}
      className={className}
    >
      <TitleBar
        title={title}
        icon={icon}
        onMinimize={() => setMinimized(!minimized)}
        onClose={() => setClosed(true)}
        active
      />
      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Clock ────────────────────────────────────────────────────────────────────
function Win2KClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
        color: "#000",
        padding: "0 8px",
        borderLeft: "1px solid #808080",
        borderTop: "1px solid #808080",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {time}
    </div>
  );
}

// ─── Taskbar ──────────────────────────────────────────────────────────────────
function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);
  return (
    <>
      {startOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: 0,
            zIndex: 9999,
            background: "#d4d0c8",
            border: "2px solid",
            borderColor: "#ffffff #808080 #808080 #ffffff",
            width: "180px",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to bottom, #0a246a, #3a6ea5)",
              color: "#ffffff",
              padding: "8px 4px 8px 6px",
              fontWeight: "bold",
              fontSize: "12px",
              letterSpacing: "0.05em",
              writingMode: "horizontal-tb",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🪟</span>
            <div>
              <div style={{ fontSize: "9px", fontWeight: "normal" }}>Jay Singh Chauhan</div>
              <div>Portfolio 2000</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #808080" }}>
            {[
              { label: "My Portfolio", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#0a246a] hover:text-white"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 8px",
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontFamily: "Tahoma, Arial, sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0a246a";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                }}
              >
                <span>📁</span> {item.label}
              </a>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #808080",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "default",
            }}
            onClick={() => setStartOpen(false)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#0a246a";
              (e.currentTarget as HTMLDivElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
              (e.currentTarget as HTMLDivElement).style.color = "#000";
            }}
          >
            <span>⏻</span>
            <span style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px" }}>Shut Down...</span>
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30px",
          background: "#d4d0c8",
          borderTop: "2px solid",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          padding: "0",
        }}
      >
        {/* Start button */}
        <button
          onClick={() => setStartOpen(!startOpen)}
          style={{
            height: "28px",
            padding: "0 10px",
            background: "#d4d0c8",
            border: "2px solid",
            borderColor: startOpen
              ? "#808080 #ffffff #ffffff #808080"
              : "#ffffff #808080 #808080 #ffffff",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: "2px",
          }}
        >
          <span>🪟</span> Start
        </button>

        {/* Separator */}
        <div style={{ width: "1px", height: "24px", background: "#808080", margin: "0 4px", borderRight: "1px solid #fff" }} />

        {/* Running programs */}
        <div style={{ display: "flex", gap: "2px", flex: 1, overflow: "hidden", padding: "0 2px" }}>
          {["Jay's Portfolio", "My Projects", "GitHub Activity"].map((win) => (
            <button
              key={win}
              style={{
                height: "22px",
                padding: "0 8px",
                background: "#d4d0c8",
                border: "2px solid",
                borderColor: "#808080 #ffffff #ffffff #808080",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                cursor: "default",
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "10px" }}>🖥️</span>
              <span>{win}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div style={{ display: "flex", alignItems: "center", borderLeft: "1px solid #808080", height: "100%" }}>
          <Win2KClock />
        </div>
      </div>
    </>
  );
}

// ─── Desktop Icon ─────────────────────────────────────────────────────────────
function DesktopIcon({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={() => { setSelected(true); setTimeout(() => setSelected(false), 300); onClick?.(); }}
      className="flex flex-col items-center gap-1 p-1 cursor-default"
      style={{ width: "64px", background: "transparent", border: "none" }}
    >
      <span
        style={{
          fontSize: "32px",
          filter: selected ? "brightness(0.7) sepia(1) hue-rotate(180deg)" : "none",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "11px",
          color: "#ffffff",
          textShadow: "1px 1px 2px #000",
          textAlign: "center",
          background: selected ? "#0a246a" : "transparent",
          padding: "0 2px",
          lineHeight: "1.3",
          wordBreak: "break-word",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("Experience");
  const [ghTheme] = useState<"light" | "dark">("light");

  return (
    <>
      {/* Desktop background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#008080",
          zIndex: -1,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #006666 0%, transparent 50%), radial-gradient(circle at 80% 20%, #009999 0%, transparent 40%)",
        }}
      />

      {/* Desktop icons (top-left) */}
      <div
        style={{
          position: "fixed",
          top: "8px",
          left: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 100,
        }}
      >
        <DesktopIcon icon="🖥️" label="My Portfolio" />
        <DesktopIcon icon="📁" label="My Projects" onClick={() => window.open("/projects", "_self")} />
        <DesktopIcon icon="🌐" label="GitHub" onClick={() => window.open("https://github.com/jaychauhan-exe1", "_blank")} />
        <DesktopIcon icon="📝" label="Blog" onClick={() => window.open("/blog", "_self")} />
        <DesktopIcon icon="📧" label="Contact" onClick={() => window.open("mailto:work@jaysinghchauhan.com")} />
      </div>

      {/* Main content area */}
      <div
        className="flex flex-col gap-4 pb-10"
        style={{
          minHeight: "100vh",
          paddingTop: "16px",
          paddingBottom: "40px",
          paddingLeft: "80px",
          paddingRight: "16px",
          fontFamily: "Tahoma, Arial, sans-serif",
        }}
      >

        {/* ── Explorer Window ─────────────────────────────── */}
        <Win2KWindow
          title="Jay Singh Chauhan - Portfolio [Internet Explorer]"
          icon={<span style={{ fontSize: "12px" }}>🌐</span>}
        >
          <MenuBar items={["File", "Edit", "View", "Favorites", "Tools", "Help"]} />

          {/* Address bar */}
          <div
            className="flex items-center gap-2 px-2 py-1"
            style={{ background: "#d4d0c8", borderBottom: "1px solid #808080" }}
          >
            <span style={{ fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif", color: "#000" }}>
              Address:
            </span>
            <Win2KInset className="flex-1">
              <span style={{ fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif", color: "#0000cc" }}>
                http://www.jaysinghchauhan.com/portfolio/
              </span>
            </Win2KInset>
            <Win2KButton onClick={() => {}}>Go</Win2KButton>
          </div>

          {/* Main content pane */}
          <Win2KInset className="m-2">
            {/* Hero */}
            <div
              className="flex flex-col md:flex-row gap-6 p-4"
              style={{ background: "#ffffff" }}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  style={{
                    border: "2px solid",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                    padding: "2px",
                    background: "#d4d0c8",
                  }}
                >
                  <Image
                    src="/me.webp"
                    alt="Jay Singh Chauhan"
                    width={120}
                    height={160}
                    priority
                    style={{ display: "block" }}
                  />
                </div>
                <div
                  style={{
                    background: "#000080",
                    color: "#ffffff",
                    padding: "2px 8px",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  profile.jpg
                </div>
              </div>

              <div className="flex-1">
                <h1
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000080",
                    marginBottom: "4px",
                    borderBottom: "2px solid #808080",
                    paddingBottom: "4px",
                  }}
                >
                  Jay Singh Chauhan
                </h1>
                <table style={{ fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif", marginBottom: "8px", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ color: "#808080", paddingRight: "8px", paddingBottom: "2px" }}>Title:</td>
                      <td style={{ color: "#000", paddingBottom: "2px" }}>Full Stack Product Engineer &amp; Design Engineer</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808080", paddingRight: "8px", paddingBottom: "2px" }}>Location:</td>
                      <td style={{ color: "#000", paddingBottom: "2px" }}>New Delhi, India</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808080", paddingRight: "8px", paddingBottom: "2px" }}>Status:</td>
                      <td style={{ paddingBottom: "2px" }}>
                        <span style={{ color: "#008000", fontWeight: "bold" }}>● Available for work</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808080", paddingRight: "8px" }}>Email:</td>
                      <td>
                        <a
                          href="mailto:work@jaysinghchauhan.com"
                          style={{ color: "#0000ee", textDecoration: "underline", fontSize: "11px" }}
                        >
                          work@jaysinghchauhan.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif", color: "#000", lineHeight: "1.6", marginBottom: "8px" }}>
                  A full stack{" "}
                  <a href="https://www.ibm.com/think/topics/product-engineering" target="_blank" rel="noopener noreferrer" style={{ color: "#0000ee" }}>
                    product engineer
                  </a>{" "}
                  and designer with experience across research, strategy, design, and engineering,
                  focused on delivering well-designed digital products. I help businesses turn ideas
                  into{" "}
                  <a href="https://en.wikipedia.org/wiki/Scalability" target="_blank" rel="noopener noreferrer" style={{ color: "#0000ee" }}>
                    scalable
                  </a>{" "}
                  user-friendly solutions that solve real problems.
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <a href="mailto:work@jaysinghchauhan.com">
                    <Win2KButton>📧 Send Email</Win2KButton>
                  </a>
                  <a href="https://github.com/jaychauhan-exe1" target="_blank" rel="noopener noreferrer">
                    <Win2KButton>🐙 GitHub</Win2KButton>
                  </a>
                  <a href="https://dribbble.com/jaychauhanexe" target="_blank" rel="noopener noreferrer">
                    <Win2KButton>🎨 Dribbble</Win2KButton>
                  </a>
                  <a href="https://linkedin.com/in/jaychauhanexe" target="_blank" rel="noopener noreferrer">
                    <Win2KButton>💼 LinkedIn</Win2KButton>
                  </a>
                </div>
              </div>
            </div>
          </Win2KInset>
          <StatusBar left="Done" right="Internet zone" />
        </Win2KWindow>

        {/* ── Tabbed Window: Experience / Projects / Achievements ─── */}
        <Win2KWindow title="Jay's Portfolio - Windows Explorer" icon={<span style={{ fontSize: "12px" }}>📁</span>}>
          <MenuBar items={["File", "Edit", "View", "Tools", "Help"]} />
          <div style={{ background: "#d4d0c8", padding: "4px 4px 0" }}>
            <Win2KTabs
              tabs={["Experience", "Projects", "Achievements"]}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div
            style={{
              background: "#d4d0c8",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              borderTop: "none",
              padding: "8px",
              margin: "0 4px 4px 4px",
            }}
          >
            {activeTab === "Experience" && (
              <Win2KInset>
                <div style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 4px",
                      background: "#000080",
                      color: "#fff",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    <span>Position</span>
                    <span>Year</span>
                  </div>
                  {data.experience.map((item, i) => (
                    <ExpRow key={i} item={item} />
                  ))}
                </div>
              </Win2KInset>
            )}

            {activeTab === "Projects" && (
              <Win2KInset>
                <div style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 4px",
                      background: "#000080",
                      color: "#fff",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    <span>Project</span>
                    <span>Tech</span>
                  </div>
                  {data.projects.map((item, i) => (
                    <ExpRow key={i} item={item} />
                  ))}
                  <div className="mt-3 pt-2" style={{ borderTop: "1px solid #d4d0c8" }}>
                    <Link href="/projects">
                      <Win2KButton>📂 View All Projects...</Win2KButton>
                    </Link>
                  </div>
                </div>
              </Win2KInset>
            )}

            {activeTab === "Achievements" && (
              <Win2KInset>
                <div style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 4px",
                      background: "#000080",
                      color: "#fff",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    <span>Achievement</span>
                    <span>Year</span>
                  </div>
                  <ExpRow item={{ title: "Level 2 Seller on Fiverr", year: "2022", description: "Reached Level 2 Seller on Fiverr through consistent 5-star work, positive client feedback, and successful project delivery. It reflects the trust clients place in me and the effort I put into every project." }} />
                  <ExpRow item={{ title: "100+ Completed Projects", year: "2024", description: "Successfully completed over 100 freelance projects across e-commerce, healthcare, education, and pharmaceutical industries with consistent 5-star ratings." }} />
                  <ExpRow item={{ title: "Founded Aciony Studios", year: "2026", description: "Launched an all-in-one digital studio providing design, development, automation, and marketing solutions for growing businesses." }} />
                </div>
              </Win2KInset>
            )}
          </div>
          <StatusBar left={`${activeTab} - ${activeTab === "Experience" ? data.experience.length : activeTab === "Projects" ? data.projects.length : 3} item(s)`} right="Ready" />
        </Win2KWindow>

        {/* ── Tech Stack dialog ─── */}
        <Win2KWindow title="System Properties - Tech Stack" icon={<span style={{ fontSize: "12px" }}>⚙️</span>}>
          <div style={{ padding: "8px", background: "#d4d0c8" }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(techStack).map(([cat, items]) => (
                <Win2KInset key={cat}>
                  <div
                    style={{
                      fontFamily: "Tahoma, Arial, sans-serif",
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#000080",
                      borderBottom: "1px solid #d4d0c8",
                      marginBottom: "4px",
                      paddingBottom: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat}
                  </div>
                  {items.map((s) => (
                    <div
                      key={s}
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "11px",
                        color: "#000",
                        padding: "1px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontSize: "8px", color: "#000080" }}>►</span>
                      {s}
                    </div>
                  ))}
                </Win2KInset>
              ))}
            </div>
            <div className="flex justify-end mt-3 gap-2">
              <Win2KButton>OK</Win2KButton>
              <Win2KButton>Cancel</Win2KButton>
              <Win2KButton>Apply</Win2KButton>
            </div>
          </div>
        </Win2KWindow>

        {/* ── GitHub contributions ─── */}
        <Win2KWindow title="GitHub Activity Monitor" icon={<span style={{ fontSize: "12px" }}>📊</span>}>
          <MenuBar items={["File", "View", "Options"]} />
          <div style={{ padding: "8px", background: "#d4d0c8" }}>
            <Win2KInset>
              <div style={{ overflowX: "auto", padding: "4px" }}>
                <GitHubCalendar
                  blockSize={10}
                  blockMargin={3}
                  colorScheme="light"
                  username="jaychauhan-exe1"
                />
              </div>
            </Win2KInset>
          </div>
          <StatusBar left="Contributions loaded" right="jaychauhan-exe1" />
        </Win2KWindow>

        {/* ── Off the Screen / Bio ─── */}
        <Win2KWindow title="Notepad - off_the_screen.txt" icon={<span style={{ fontSize: "12px" }}>📄</span>}>
          <MenuBar items={["File", "Edit", "Format", "View", "Help"]} />
          <Win2KInset className="m-2">
            <div
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "11px",
                color: "#000",
                lineHeight: "1.6",
                minHeight: "100px",
                background: "#ffffff",
                padding: "4px",
                whiteSpace: "pre-wrap",
              }}
            >
              {`Off the Screen - Jay Singh Chauhan
${"=".repeat(40)}

I believe design is an act of deliberate perception.
Off the screen, I practice deceleration, attuning 
myself to subtleties, textures, and latent patterns 
that most overlook. I study the architecture behind 
products, the cadence of human interaction, and the 
quiet logic embedded in everyday systems.

These observations are not idle curiosities —
they are instruments that sharpen how I conceive,
construct, and refine experiences for others.

Design, to me, is not decoration, it is stewardship.
It is the responsibility to translate complexity into
clarity, friction into flow, and ambiguity into meaning.`}
            </div>
          </Win2KInset>
          <StatusBar left="Ln 14, Col 1" right="100%" />
        </Win2KWindow>

        {/* ── Contact dialog ─── */}
        <Win2KWindow title="Contact - work@jaysinghchauhan.com" icon={<span style={{ fontSize: "12px" }}>📧</span>}>
          <div style={{ padding: "12px", background: "#d4d0c8" }}>
            <div className="flex items-start gap-4">
              <span style={{ fontSize: "36px" }}>✉️</span>
              <div className="flex-1">
                <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>
                  Have something for me?
                </p>
                <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: "#000", marginBottom: "10px" }}>
                  I am currently available for new projects and collaborations.
                  Feel free to reach out!
                </p>
                <div className="flex gap-2 flex-wrap">
                  <a href="mailto:work@jaysinghchauhan.com" id="contact">
                    <Win2KButton>📧 work@jaysinghchauhan.com</Win2KButton>
                  </a>
                  <a href="https://www.fiverr.com/jaychauhan123" target="_blank" rel="noopener noreferrer">
                    <Win2KButton>🛍️ Hire on Fiverr</Win2KButton>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <StatusBar left="Ready" />
        </Win2KWindow>

        {/* Spacer for taskbar */}
        <div style={{ height: "40px" }} />
      </div>

      <Taskbar />
    </>
  );
}
