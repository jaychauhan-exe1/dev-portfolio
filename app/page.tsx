"use client";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import Image from "next/image";
import ExpandableContent from "../components/expandableContent";
import { GitHubCalendar } from "react-github-calendar";
import { Cat, Moon, Sun } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { GradientButton } from "../components/ui/gradientButton";
import TechStack from "@/components/ui/TechStack";

const data = {
  experience: [
    {
      title: "Freelance - Fiverr",
      year: "2021 - 2024",
      description: "I began my freelancing journey on Fiverr in 2021, and since then I have successfully completed over 100 projects while maintaining a consistent 5-star rating. Throughout this experience, I’ve had the opportunity to collaborate with clients from around the world, gaining valuable exposure to diverse business needs, workflows, and expectations. My work spans a wide range of industries, including e-commerce, healthcare, education, and pharmaceuticals, with particularly strong experience in projects related to pharmacies and healthcare businesses. \n\n I really enjoy helping businesses grow and making things work better behind the scenes. I like solving problems, improving systems, and building solutions that people actually find useful. I keep things straightforward when working with clients, I’m always up for new challenges and love working on projects that push me to learn something new.",
      link: "https://www.fiverr.com/jaychauhan123",
    },
    {
      title: "Graphics & UI/UX Designer",
      year: "2024",
      description: "I worked as a Graphic Design Intern at Brand Insights Mafia, a digital marketing agency, where I contributed to creating visual content for social media, marketing campaigns, and branding projects. During this time, I gained hands-on experience working with real client requirements, tight deadlines, and collaborative feedback, which helped me sharpen both my design skills and my ability to think creatively under pressure. I was involved in designing posts, promotional materials, and visual assets that aligned with brand identity and marketing goals. \n\n I really enjoyed being part of a fast-paced creative environment where ideas were constantly evolving. It taught me how to balance creativity with strategy, take constructive feedback positively, and focus on designs that not only look good but also communicate clearly and effectively. The experience strengthened my attention to detail and gave me a better understanding of how design plays a key role in digital marketing and brand growth.",
      link:"https://www.insightsmafia.com"
    },
    {
      title: "Aciony Studios - Founder",
      year: "2024 - BREWING",
      description: "In 2026, I founded Aciony Studios with the goal of bringing together everything I’ve learned from years of freelancing into one place. Through this studio, I aim to provide businesses with complete, all-in-one solutions, ie. , from design and branding to web apps, custom systems, automations, marketing support, and social media management. Instead of offering isolated services, my focus is on helping businesses build strong digital foundations that actually support their growth. \n\n I started Aciony Studios because I saw how many businesses struggle when their tools, branding, and systems don’t work well together. I enjoy understanding how a business operates behind the scenes and then building solutions that make things smoother, more efficient, and easier to scale. This is just the beginning, and I’m excited to grow it into a studio that delivers real value and long-term impact for the brands I work with.",
    },
  ],
  learnings: [
    {
      title: "I learnt a lot from my experiences",
      description: "Every project I’ve worked on has taught me something valuable, not just about technology or design, but about people, expectations, and problem-solving. I’ve learned that good work isn’t only about skill, it’s about listening carefully, understanding the bigger picture, and finding practical solutions that actually help. \n\n My experiences have shown me that growth happens when you step outside your comfort zone, take feedback seriously, and stay curious enough to keep improving. Those lessons continue to shape how I think, how I work, and how I approach every new challenge.",
    },
  ],
  achievements: [
    {
      title: "Level 2 account on Fiverr",
      year: "2022",
      description: "Reached Level 2 Seller on Fiverr through consistent 5-star work, positive client feedback, and successful project delivery. It’s a milestone that reflects the trust clients place in me and the effort I put into every project I take on.",
    },
  ],
  projects: [
    {
      title: "Business Reports",
      link: "https://github.com/jaychauhan-exe1/better-reports",
      year: "NEXT JS",
      description: "Better Reports is a business analytics dashboard I built to help businesses understand their data in a clear and practical way. It allows users to compare sales in multiple formats, generate invoices, and view performance insights through clean visual reports, making it easier to track growth and spot trends without digging through complex spreadsheets. \n\n One of its standout features is an AI assistant that can answer questions about business performance, sales data, and trends in real time, helping users get instant insights without manual analysis. I used local AI model using ollama to keep the business data safe and secure. Building this project strengthened my skills in data visualization, system design, and creating tools that are not only powerful but genuinely useful for real business decisions.",
    },
    {
      title: "Sales Mobility App",
      link: "https://github.com/jaychauhan-exe1/bettermobility",
      year: "EXPO APP",
      description: "Sales Mobility App is a field sales management system I built to replace manual, paper-based workflows with a streamlined digital solution. It allows sales representatives to create orders, manage returns, submit field reports, and handle daily sales activities directly from their mobile devices, improving accuracy and saving time for both reps and management. \n\n The app also supports real-time invoice generation with portable printer integration, enabling instant billing during client visits. This project strengthened my ability to design systems that solve real-world business problems and demonstrated how thoughtful digital tools can significantly improve operational efficiency.",
    },
    {
      title: "Think File",
      link: "https://think-file.vercel.app",
      year: "GEN AI",
      description: "ThinkFile is a Retrieval-Augmented Generation (RAG) system I built to explore and deepen my understanding of generative AI systems. It allows users to upload and interact with their data through AI-powered conversations, supporting formats such as Word, PDF, CSV, XLSX, Markdown, and other text-based files. Instead of manually searching documents, users can ask questions and receive context-aware answers instantly. \n\n The system currently runs on Gemini 3 Flash and 2.5 models, and includes structured file and project management along with chat history tracking. This project was intentionally built as a hands-on learning experience to better understand GenAI architecture, document processing pipelines, and real-world implementation patterns. While it’s not intended as a final product, it served as a practical foundation for experimenting with advanced AI workflows and system design.",
    },
  ],

};
const greetings = ["Hello", "Namaste", "Hola", "Bonjour", "Ciao", "こんにちは", "Guten Tag"];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [catActivated, setCatActivated] = useState(false);
  const [showTom, setShowTom] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Cycle through greetings every 2 seconds
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
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
    <div id='master-container' className="relative">
      <section className="flex justify-center flex-col items-center mt-20 my-8">
        <motion.div
          animate={controls}
          drag={isDesktop}
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
        {showTom ? (
          <div className="z-1 -top-20 absolute top-20 hidden lg:flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-10 duration-400">
            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-xl">
              <Image
                src="/tom.jpg"
                alt="bear the cat"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-cabin-sketch text-foreground py-1">
              stay with her☺️
            </span>
          </div>
        ) : (
          <div
            className="z-1 top-30 absolute cursor-pointer hidden lg:block"
            onClick={() => {
              if (!catActivated) {
                window.dispatchEvent(new Event('activateCat'));
                setCatActivated(true);
              } else {
                setShowTom(true);
              }
            }}
          >
            <GradientButton className='p-2!'>
              <Cat />
            </GradientButton>
          </div>
        )}

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
            A full stack <a className="underline underline-offset-4 hover:bg-primary/30 transition-colors duration-300 ease-out" href="https://www.ibm.com/think/topics/product-engineering">product engineer</a> and designer with experience across research, strategy,
            design, and engineering, focused on delivering well-designed digital products.
          </p>
          <p className="text-foreground/80 text-lg tracking-wide mb-2">
            I help businesses turn ideas into <a className="underline underline-offset-4 hover:bg-primary/30 transition-colors duration-300 ease-out" href="https://en.wikipedia.org/wiki/Scalability" target="_blank" rel="noopener noreferrer">scalable</a> user-friendly solutions that solve real problems.
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
        <TechStack />
      </section>

      <section className="flex flex-col gap-6 my-16 p-6 border border-border rounded-xl">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Achievements
        </h4>
        {achievementsContent}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <motion.a
          onClick={toggleTheme}
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
                className="absolute top-1/2 -translate-y-1/2 inline-block"
              >
                //
              </motion.span>
              <motion.span
                variants={{
                  initial: { rotate: 15, opacity: 0 },
                  hover: { rotate: 0, opacity: 1 }
                }}
                className="absolute top-1/2 -translate-y-1/2 inline-block"
              >
                | |
              </motion.span>
            </span>
            <motion.span
              variants={{
                initial: { x: -4 },
                hover: { x: -8 }
              }}
              className="inline-block"
            >
              Off the Screen
            </motion.span>
          </h4>
          <motion.div
            variants={{
              initial: { opacity: 0, x: -10, rotate: -45 },
              hover: { opacity: 1, x: 15, rotate: 0 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <ThemeIcon size={14} />
          </motion.div>
        </motion.a>
        <p className="text-sm text-foreground/60 tracking-wide">
          I believe design is an act of deliberate perception. Off the screen,
           I practice deceleration, attuning myself to subtleties, textures, and
           latent patterns that most overlook. I study the architecture behind
           products, the cadence of human interaction, and the quiet logic 
           embedded in everyday systems. These observations are not idle curiosities,
           they are instruments that sharpen how I conceive, construct, and refine 
           experiences for others.
          <br /> <br /> Design, to me, is not decoration, it is stewardship. It is 
          the responsibility to translate complexity into clarity, friction into flow, 
          and ambiguity into meaning. I remain anchored in curiosity, guided by discernment, 
          and committed to craft with unwavering resolve—on the canvas, in code, and in thought.
        </p>
      </section>
      <section id="contact" className="flex flex-col gap-6 my-16">
        <h4 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Git in Touch
        </h4>
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
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
