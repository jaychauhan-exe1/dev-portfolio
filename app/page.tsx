"use client";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import Image from "next/image";
import ExpandableContent from "../components/expandableContent";
import { GitHubCalendar } from "react-github-calendar";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { GradientButton } from "../components/ui/gradientButton";

const data = {
  experience: [
    {
      title: "Freelance - Fiverr",
      year: "2021 - 2024",
      description:
        "As a full-stack developer at Fiverr, I have been responsible for designing and implementing scalable web applications that meet the needs of our clients. My role involves collaborating with cross-functional teams to gather requirements, develop technical specifications, and deliver high-quality solutions on time. I have experience working with a variety of technologies, including React, Node.js, and MongoDB, and I am committed to writing clean, maintainable code that adheres to industry best practices.",
      link: "https://www.fiverr.com/jaychauhan123",
    },
    {
      title: "Graphics Design - Internship",
      year: "2024",
      description:
        "As a full-stack developer at Fiverr, I have been responsible for designing and implementing scalable web applications that meet the needs of our clients. My role involves collaborating with cross-functional teams to gather requirements, develop technical specifications, and deliver high-quality solutions on time. I have experience working with a variety of technologies, including React, Node.js, and MongoDB, and I am committed to writing clean, maintainable code that adheres to industry best practices.",
    },
    {
      title: "Aciony Studios - Founder",
      year: "2024 - BREWING",
      description:
        "As a full-stack developer at Fiverr, I have been responsible for designing and implementing scalable web applications that meet the needs of our clients. My role involves collaborating with cross-functional teams to gather requirements, develop technical specifications, and deliver high-quality solutions on time. I have experience working with a variety of technologies, including React, Node.js, and MongoDB, and I am committed to writing clean, maintainable code that adheres to industry best practices.",
    },
  ],
  learnings: [
    {
      title: "I learnt a lot from my experiences",
      description:
        "As a full-stack developer at Fiverr, I have been responsible for designing and implementing scalable web applications that meet the needs of our clients. My role involves collaborating with cross-functional teams to gather requirements, develop technical specifications, and deliver high-quality solutions on time. I have experience working with a variety of technologies, including React, Node.js, and MongoDB, and I am committed to writing clean, maintainable code that adheres to industry best practices.",
    },
  ],
  achievements: [
    {
      title: "Level 2 account on Fiverr",
      year: "2022",
      description:
        "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
    },
  ],
  projects: [
    {
      title: "Business Reports",
      link: "https://github.com/jaychauhan-exe1/better-reports",
      year: "NEXT JS",
      description:
        "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
    },
    {
      title: "Sales Mobility App",
      link: "https://github.com/jaychauhan-exe1/bettermobility",
      year: "EXPO APP",
      description:
        "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
    },
    {
      title: "Think File",
      link: "https://think-file.vercel.app",
      year: "GEN AI",
      description:
        "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
    },
  ],

};
const greetings = ["Hello", "Namaste", "Hola", "Bonjour", "Ciao", "こんにちは", "Guten Tag"];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const initialTheme = (savedTheme as "dark" | "light") || systemTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Cycle through greetings every 2 seconds
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 3. Apply/Remove the "dark" class on the <html> tag whenever theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const experienceContent = useMemo(() => <ExpandableContent items={data.experience} />, []);
  const learningsContent = useMemo(() => <ExpandableContent items={data.learnings} />, []);
  const achievementsContent = useMemo(() => <ExpandableContent items={data.achievements} />, []);
  const projectsContent = useMemo(() => <ExpandableContent items={data.projects} />, []);

  const controls = useAnimation();
  const [lastTap, setLastTap] = useState(0);

  const handleReset = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    });
  };

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleReset();
    }
    setLastTap(now);
  };

  // Prevent rendering before theme is determined to avoid flicker
  if (!theme) return null;

  return (
    <div id='master-container' className="max-w-2xl w-full mx-auto p-4 pb-20 relative">
      <section className="flex justify-center flex-col items-center mt-20 my-8">
        <motion.div
          animate={controls}
          drag
          dragMomentum={false}
          onTap={handleTap}
          onDoubleClick={handleReset}
          whileDrag={{ scale: 1.05, zIndex: 10 }}
          className="relative mb-10 cursor-grab active:cursor-grabbing touch-none z-10"
        >
          <Image
            src="/me.webp"
            alt="profile picture"
            width={216}
            height={300}
            draggable={false}
          />
          <div className="absolute bottom-0 bg-linear-to-t from-background via-background/60 to-transparent left-0 w-full h-[30%] pointer-events-none"></div>
        </motion.div>
        <Link href="/components" className="z-1 -top-30 absolute top-55">
          <GradientButton className='px-4! py-2!'>
            components
          </GradientButton>
        </Link>

        <div className="text-xl font-bold text-foreground text-center flex flex-col gap-4 mb-2">
          <motion.div
            layout
            transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
            className="flex flex-row w-full justify-center items-center gap-1 h-8"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={greetingIndex}
                layout
                initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                transition={{
                  filter: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.2 },
                  y: { duration: 0.3 },
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              layout
              transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
            >
              , I&apos;m
            </motion.span>
          </motion.div>
          <h1 className="">
            <span className="text-5xl font-cabin-sketch">Jay Singh Chauhan</span>
          </h1>
        </div>

        <div className="text-foreground/40 mb-4">
          <span>/dʒeɪ sɪŋ tʃɔːˈhɑːn/</span> • <span>noun</span> •{" "}
          <a href="#contact" className="hover:text-emerald-500 cursor-pointer transition-colors duration-300 ease-out">available for work</a>
        </div>
        <div className="mb-2">
          <p className="text-foreground/80 text-lg tracking-wide  mb-2">
            A full-stack developer with extensive experience across strategy,
            design, and engineering, focused on delivering well-designed <a className="underline underline-offset-4 hover:bg-primary/30 transition-colors duration-300 ease-out" href="https://en.wikipedia.org/wiki/Digital_product_design" target="_blank" rel="noopener noreferrer">digital products.</a>
          </p>
          <p className="text-foreground/80 text-lg tracking-wide mb-2">
            I help businesses turn ideas into scalable, user-friendly solutions
            that solve real problems.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-6 my-8">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Experience
        </h4>
        {experienceContent}
      </section>
      <section className="flex flex-col gap-6 my-8 border-border px-8 pt-5 relative">
        <div className="w-[4px] h-full bg-border absolute top-0 left-0"></div>
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Learnings
        </h4>
        {learningsContent}
      </section>
      <section className="flex flex-col gap-6 my-16">
        <div className="flex justify-between items-center">
          <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
        // Projects
          </h4>
          <Link href="/projects">
            <button className="cursor-pointer text-foreground/80 text-sm tracking-wide underline underline-offset-4 hover:bg-primary/30 transition-colors duration-300 ease-out">All Projects</button>
          </Link>
        </div>
        {projectsContent}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Github Contributions
        </h4>
        <GitHubCalendar
          blockSize={9}
          blockMargin={3}
          colorScheme={theme === "dark" ? "dark" : "light"}
          username="jaychauhan-exe1"
        />
      </section>

      <section className="flex flex-col gap-6 my-16">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Tech Stack
        </h4>
      </section>

      <section className="flex flex-col gap-6 my-16 p-6 border border-border rounded-xl">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Achievements
        </h4>
        {achievementsContent}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <motion.div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover="hover"
          initial="initial"
          className="cursor-pointer group/dark w-fit relative text-foreground/80 text-cabin-sketch"
        >
          <h4 className="text-foreground text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase flex items-center gap-2">
            <span className="relative w-4 h-4 mr-1">
              <motion.span
                variants={{
                  initial: { rotate: 0, opacity: 1 },
                  hover: { rotate: -15, opacity: 0 }
                }}
                className="absolute inset-0 inline-block"
              >
                //
              </motion.span>
              <motion.span
                variants={{
                  initial: { rotate: 15, opacity: 0 },
                  hover: { rotate: 0, opacity: 1 }
                }}
                className="absolute inset-0 inline-block"
              >
                ||
              </motion.span>
            </span>
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 4 }
              }}
              className="inline-block"
            >
              Off the Screen
            </motion.span>
          </h4>
          <motion.div
            variants={{
              initial: { opacity: 0, x: -10, rotate: -45 },
              hover: { opacity: 1, x: 20, rotate: 0 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <ThemeIcon size={14} />
          </motion.div>
        </motion.div>
        <p className="text-sm text-foreground/60 tracking-wide">
          Off the screen, I enjoy slowing things down and paying attention to
          the details that usually get missed. I like spending time learning new
          things outside of work, whether that’s exploring how products are
          built behind the scenes, improving the way I think and communicate, or
          simply observing how people interact with technology in everyday life.
          These moments often influence how I approach problems and make
          decisions when I’m building for others.
          <br /> <br />I value consistency, clarity, and doing things properly
          rather than rushing for quick wins. Outside of work, I enjoy quiet
          routines, experimenting with ideas, and occasionally stepping back to
          reflect on what’s working and what can be improved. This mindset helps
          me stay grounded, curious, and intentional—both in my work and beyond
          it.
        </p>
      </section>
      <section id="contact" className="flex flex-col gap-6 my-16">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Git in Touch
        </h4>
        <div className="flex justify-between items-center">
          <h3 className="text-foreground/80 text-lg tracking-wide md:tracking-wider mb-2">
            Help me improve by providing me work 😅
          </h3>
          <a href="mailto:jaychauhan.exe@gmail.com">
            <GradientButton>
              work with me
            </GradientButton>
          </a>
        </div>
      </section>

    </div>
  );
}
