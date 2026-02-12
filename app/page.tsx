"use client";
import Image from "next/image";
import ExpandableContent from "../components/expandableContent";
import { GitHubCalendar } from "react-github-calendar";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { RawData } from "@/components/RawData";




const data = {
  experience: [
    {
      title: "Freelance - Fiverr",
      year: "2021 - 2024",
      description:
        "As a full-stack developer at Fiverr, I have been responsible for designing and implementing scalable web applications that meet the needs of our clients. My role involves collaborating with cross-functional teams to gather requirements, develop technical specifications, and deliver high-quality solutions on time. I have experience working with a variety of technologies, including React, Node.js, and MongoDB, and I am committed to writing clean, maintainable code that adheres to industry best practices.",
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
    }, 2000);
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

  // Prevent rendering before theme is determined to avoid flicker
  if (!theme) return null;



  return (
    <div id='master-container' className="max-w-2xl w-full mx-auto p-4 pb-20 relative">
      <section className="flex justify-center flex-col items-center mt-20 my-8">
        <div className="relative mb-10">
          <Image
            src="/me.webp"
            alt="profile picture"
            width={216}
            height={300}
          />
          <div className="absolute bottom-0 bg-linear-to-t from-background via-background/60 to-transparentleft-0 w-full h-[30%]"></div>
        </div>

        <div className="text-xl font-bold text-foreground text-center flex flex-col gap-4 mb-2">
          <div className="flex flex-row w-full justify-center items-center gap-2">
            <span key={greetingIndex} style={{ animation: 'slideUp 0.5s ease-out' }}>{greetings[greetingIndex]}</span>, I'm <br />{" "}
          </div>
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
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="cursor-pointer group/dark w-fit relative text-foreground/80 text-cabin-sketch">

          <h4 className="text-foreground text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase ">
            <span className="inline-block left-0 rotate-0 opacity-100 group-hover/dark:-rotate-12 group-hover/dark:opacity-0 transition-all duration-100">//</span>
            <span className="absolute top-1/2 -translate-y-1/2 left-0 rotate-12 opacity-0 group-hover/dark:rotate-0 group-hover/dark:opacity-100 transition-transform duration-200">| |</span>
            <span className="inline-block translate-x-2 group-hover/dark:translate-x-0 transition-transform duration-200">Off the Screen</span>
          </h4>
          <ThemeIcon
            size={14}
            className="absolute right-0 top-[calc(50%-1px)] -translate-y-1/2 opacity-0 transform-style-preserve-3d transition-all duration-400 group-hover/dark:translate-x-5 group-hover/dark:opacity-100 group-hover/dark:rotate-y-360"
          /> </div>
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
          <button className="cursor-pointer font-medium relative h-12 w-48 group overflow-hidden rounded-full bg-foreground text-background hover:bg-background hover:text-foreground dark:hover:bg-foreground dark:hover:text-background transition-colors duration-300">
            {/* The Container for the "Edges" movement */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute h-2 w-[80%] bg-[#26F9D6] blur-lg rounded-full group-hover:h-40 group-hover:w-40 transition-all duration-300"
                style={{
                  offsetPath: "rect(0% 100% 100% 0% round 9999px)",
                  animation: "move-around 4s linear infinite"
                }}
              />
              <div
                className="absolute h-2 w-[90%] bg-[#E1BFFF] blur-lg rounded-full group-hover:h-40 group-hover:w-40 transition-all duration-300"
                style={{
                  offsetPath: "rect(0% 100% 100% 0% round 9999px)",
                  animation: "move-around 4s linear infinite",
                  animationDelay: "-2s"
                }}
              />
            </div>
            <a href="mailto:jaychauhan.exe@gmail.com"><span className="relative z-10">work with me</span></a>

          </button>
        </div>
      </section>
      <div
        id="raw"
        className='pt-0 md:pt-20 fixed left-1/2 -translate-x-1/2 bg-background top-full h-screen w-full max-w-2xl transition-all duration-300 ease-in-out '
      >
        <RawData />
      </div>
      <Navbar />
    </div>
  );
}
