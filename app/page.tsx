"use client";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import Image from "next/image";
import ExpandableContent from "../components/expandableContent";
import { GitHubCalendar } from "react-github-calendar";
import { Cat, Moon, Sun, ArrowRightIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { GradientButton } from "../components/ui/GradientButton";
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
      description: "I worked as a Graphic Design Intern at Insights Mafia, a digital marketing agency, where I contributed to creating visual content for social media, marketing campaigns, and branding projects. During this time, I gained hands-on experience working with real client requirements, tight deadlines, and collaborative feedback, which helped me sharpen both my design skills and my ability to think creatively under pressure. I was involved in designing posts, promotional materials, and visual assets that aligned with brand identity and marketing goals. \n\n I really enjoyed being part of a fast-paced creative environment where ideas were constantly evolving. It taught me how to balance creativity with strategy, take constructive feedback positively, and focus on designs that not only look good but also communicate clearly and effectively. The experience strengthened my attention to detail and gave me a better understanding of how design plays a key role in digital marketing and brand growth.",
      link: "https://www.insightsmafia.com"
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
      title: "Mevasa",
      link: "https://mevasa.in",
      year: "ECOMMERCE",
      description: "Mevasa is an exquisitely animated and modern e-commerce platform for baby products, using playful motion and a soft aesthetic to appeal to young parents. I built this platform to deliver a seamless shopping experience, combining a warm design direction with performant frontend interactions.\n\n The project focuses on micro-interactions, clean layout structures, and high-fidelity product galleries to make digital retail feel tactile and alive. Designing and developing Mevasa helped me refine my skills in creating motion-heavy, component-driven interfaces that balance premium visual storytelling with smooth performance across all devices.",
      thumbnail: "/designs/mevasa/Product%20page%20%231.png",
    },
    {
      title: "Sales Mobility App",
      link: "https://github.com/jaychauhan-exe1/bettermobility",
      year: "EXPO APP",
      description: "Sales Mobility App is a field sales management system I built to replace manual, paper-based workflows with a streamlined digital solution. It allows sales representatives to create orders, manage returns, submit field reports, and handle daily sales activities directly from their mobile devices, improving accuracy and saving time for both reps and management. \n\n The app also supports real-time invoice generation with portable printer integration, enabling instant billing during client visits. This project strengthened my ability to design systems that solve real-world business problems and demonstrated how thoughtful digital tools can significantly improve operational efficiency.",
      thumbnail: "/designs/Sales Mobility/Slide 4_3 - 3.png",
    },
    {
      title: "Think File",
      link: "https://think-file.vercel.app",
      year: "GEN AI",
      description: "ThinkFile is a Retrieval-Augmented Generation (RAG) system I built to explore and deepen my understanding of generative AI systems. It allows users to upload and interact with their data through AI-powered conversations, supporting formats such as Word, PDF, CSV, XLSX, Markdown, and other text-based files. Instead of manually searching documents, users can ask questions and receive context-aware answers instantly. \n\n The system currently runs on Gemini 3 Flash and 2.5 models, and includes structured file and project management along with chat history tracking. This project was intentionally built as a hands-on learning experience to better understand GenAI architecture, document processing pipelines, and real-world implementation patterns. While it’s not intended as a final product, it served as a practical foundation for experimenting with advanced AI workflows and system design.",
      thumbnail: "/designs/think file/think-file.png",
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
  const [isDesignHovered, setIsDesignHovered] = useState(false);

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

  // No longer returning null to avoid SEO issues and layout shifts
  // theme is handled by initial state or script in layout

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
            alt="Jay Singh Chauhan - Full Stack Engineer & Designer"
            width={216}
            height={300}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

        <motion.div
          layout
          className="text-foreground/40 mb-4 flex items-center justify-center gap-1.5 flex-wrap"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.span layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>New Delhi, India</motion.span>
          <motion.span layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>•</motion.span>
          <motion.span
            layout
            className="cursor-pointer hover:text-foreground transition-colors duration-300 inline-grid grid-cols-1 grid-rows-1 place-items-center relative min-h-[24px]"
            onMouseEnter={() => setIsDesignHovered(true)}
            onMouseLeave={() => setIsDesignHovered(false)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isDesignHovered ? "hovered" : "normal"}
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
                className="col-start-1 row-start-1 whitespace-nowrap"
              >
                {isDesignHovered ? "UI UX + Full Stack" : "Design Engineer"}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>•</motion.span>
          <motion.a
            layout
            href="#contact"
            className="hover:text-emerald-500 cursor-pointer transition-colors duration-300 ease-out"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            available for work
          </motion.a>
        </motion.div>
        <div className="mb-2">
          <p className="text-foreground/70 text-lg tracking-wide mt-6 mb-2">
            A full stack <a target="_blank" rel="noopener noreferrer" className="underline text-foreground underline-offset-4 decoration-foreground/20 decoration-1 underline hover:decoration-foreground transition-all duration-300 ease-out" href="https://www.ibm.com/think/topics/product-engineering">product engineer</a> and designer with experience across research, strategy,
            design, and engineering, focused on delivering well-designed digital products.
          </p>
          <p className="text-foreground/70 text-lg tracking-wide mb-2">
            I help businesses turn ideas into <a className="underline underline-offset-4 text-foreground decoration-foreground/20 decoration-1 underline hover:decoration-foreground transition-all duration-300 ease-out" href="https://en.wikipedia.org/wiki/Scalability" target="_blank" rel="noopener noreferrer">scalable</a> user-friendly solutions that solve real problems.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-6 my-8">
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Work Experience
        </h2>
        {experienceContent}
      </section>
      <section className="flex flex-col gap-6 mb-8 mt-14 border-border px-8 pt-5 relative">
        <div className="w-[4px] h-full bg-border absolute top-0 left-0"></div>
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Learnings
        </h2>
        {learningsContent}
      </section>
      <section className="flex flex-col gap-6 my-16">
        <div className="flex justify-between items-center">
          <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
        // Projects
          </h2>
          <Link href="/projects" className="group flex items-center gap-1">
            <span className="cursor-pointer text-foreground/80 text-sm tracking-wide underline underline-offset-4 decoration-foreground/20 group-hover:decoration-foreground transition-all duration-300 ease-out">All Projects</span>
            <ArrowRightIcon size={14} className="text-foreground/60" />
          </Link>
        </div>
        {projectsContent}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Github Contributions
        </h2>
        {theme && (
          <GitHubCalendar
            blockSize={10.9}
            blockMargin={3}
            colorScheme={theme === "dark" ? "dark" : "light"}
            username="jaychauhan-exe1"
          />
        )}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Tech Stack
        </h2>
        <TechStack />
      </section>

      <section className="flex flex-col gap-6 my-16 p-6 border border-border rounded-xl">
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Achievements
        </h2>
        {achievementsContent}
      </section>

      <section className="flex flex-col gap-6 my-16">
        <motion.button
          onClick={toggleTheme}
          whileHover="hover"
          initial="initial"
          className="cursor-pointer group/dark w-fit relative text-foreground/80 text-cabin-sketch bg-transparent border-none p-0"
        >
          <h2 className="text-foreground text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase flex items-center gap-2">
            <span className="relative w-7 h-4 mr-1 flex items-center justify-center">
              <motion.span
                variants={{
                  initial: { rotate: 0, opacity: 1 },
                  hover: { rotate: -15, opacity: 0 }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block whitespace-nowrap"
              >
                //
              </motion.span>
              <motion.span
                variants={{
                  initial: { rotate: 15, opacity: 0 },
                  hover: { rotate: 0, opacity: 1 }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block whitespace-nowrap"
              >
                | |
              </motion.span>
            </span>
            <motion.span
              variants={{
                initial: { x: -4 },
                hover: { x: -8 }
              }}
              className="inline-block mt-0.5"
            >
              Off the Screen
            </motion.span>
          </h2>
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
        </motion.button>
        <p className="tracking-wide text-foreground/60">
          I believe design is an act of deliberate perception. Off the screen,
          I practice deceleration, attuning myself to subtleties, textures, and
          latent patterns that most overlook. I study the architecture behind
          products, the cadence of human interaction, and the quiet logic
          embedded in everyday systems. These observations are not idle curiosities,
          they are instruments that saharpen how I conceive, construct, and refine
          experiences for others.</p>

        <Image
          className="rounded-lg grayscale hover:grayscale-20 transition-all duration-300 ease-in-out my-4 mx-auto"
          src="/portfolio-meme.webp"
          alt="QR Code"
          width={400}
          height={500}
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <p className="tracking-wide text-foreground/60">
          Design, to me, is not decoration, it is stewardship. It is
          the responsibility to translate complexity into clarity, friction into flow,
          and ambiguity into meaning. I remain anchored in curiosity, guided by discernment,
          and committed to craft with unwavering resolve—on the canvas, in code, and in thought.
        </p>

      </section>
      <section id="contact" className="flex flex-col gap-6 my-16">
        <h2 className="text-foreground/60 text-sm font-cabin-sketch tracking-wide md:tracking-wider uppercase">
          // Git in Touch
        </h2>
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4 mb-8">
          <h3 className="text-foreground/80 text-lg tracking-wide md:tracking-wider mb-2">
            Have something for me?
          </h3>
          <a href="mailto:work@jaysinghchauhan.com">
            <GradientButton>
              work with me
            </GradientButton>
          </a>
        </div>
      </section>

    </div>
  );
}
