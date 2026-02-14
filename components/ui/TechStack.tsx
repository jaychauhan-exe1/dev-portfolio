
const techStack = {
    frontEnd: [
        {
            name: "React JS",
            icon: "react",
        },
        {
            name: "Next JS",
            icon: "nextdotjs"
        },
        {
            name: "Tailwind CSS",
            icon: "tailwindcss",
        },
        {
            name: "Shadcn UI",
            icon: "shadcnui",
        },
        {
            name: "Framer Motion",
            icon: "framer",
        }
    ],
    backEnd: [
        {
            name: "Node JS",
            icon: "nodedotjs",
        },
        {
            name: "MongoDB",
            icon: "mongodb",
        },
        {
            name: "PostgresSQL",
            icon: "postgresql",
        },
        {
            name: "Firebase",
            icon: "firebase",
        },
    ],
    language: [
        {
            name: "Javascript",
            icon: "javascript",
        },
        {
            name: "Typescript",
            icon: "typescript",
        },
        {
            name: "Python",
            icon: "python",
        },
        {
            name: "C++",
            icon: "cplusplus",
        },
    ],
    tools: [
        {
            name: "Git",
            icon: "git",
        },
        {
            name: "GitHub",
            icon: "github",
        },
        {
            name: "Cursor",
            icon: "cursor",
        },
        {
            name: "Postman",
            icon: "postman",
        },
        {
            name: "Docker",
            icon: "docker",
        },
        {
            name: "Claude",
            icon: "claude",
        },
        {
            name: "Gemini",
            icon: "googlegemini",
        }
    ],
    design: [
        {
            name: "Figma",
            icon: "figma",
        },
    ],
    cloud: [
        {
            name: "Vercel",
            icon: "vercel",
        },
        {
            name: "AWS",
            icon: "aws",
        },
    ],
};

export default function TechStack() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex gap-4 flex-col">
                <h4 className="text-foreground/80 text-xs tracking-wide md:tracking-wider uppercase">
                    Front End
                </h4>

                <div className="flex flex-col gap-2">
                    {techStack.frontEnd.map(skill => (
                        <div key={skill.name} className="group text-foreground/60 text-xs tracking-wide md:tracking-wider uppercase flex items-center gap-2 p-2 rounded-lg hover:bg-border/20 border border-border/0 hover:border-border/50 transition-colors duration-200">
                            <img className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" src={`https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} width={16} height={16} />
                            {skill.name}
                        </div>

                    ))}
                </div>
            </div>
            <div className="flex gap-4 flex-col">
                <h4 className="text-foreground/80 text-xs tracking-wide md:tracking-wider uppercase">
                    Back End
                </h4>

                <div className="flex flex-col gap-2">
                    {techStack.backEnd.map(skill => (
                        <div key={skill.name} className="group text-foreground/60 text-xs tracking-wide md:tracking-wider uppercase flex items-center gap-2 p-2 rounded-lg hover:bg-border/20 border border-border/0 hover:border-border/50 transition-colors duration-200">
                            <img className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" src={`https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} width={16} height={16} />
                            {skill.name}
                        </div>

                    ))}
                </div>
            </div>
            <div className="flex gap-4 flex-col">
                <h4 className="text-foreground/80 text-xs tracking-wide md:tracking-wider uppercase">
                    Language
                </h4>

                <div className="flex flex-col gap-2">
                    {techStack.language.map(skill => (
                        <div key={skill.name} className="group text-foreground/60 text-xs tracking-wide md:tracking-wider uppercase flex items-center gap-2 p-2 rounded-lg hover:bg-border/20 border border-border/0 hover:border-border/50 transition-colors duration-200">
                            <img className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" src={`https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} width={16} height={16} />
                            {skill.name}
                        </div>

                    ))}
                </div>
            </div>
            <div className="flex gap-4 flex-col">
                <h4 className="text-foreground/80 text-xs tracking-wide md:tracking-wider uppercase">
                    Tools
                </h4>

                <div className="flex flex-col gap-2">
                    {techStack.tools.map(skill => (
                        <div key={skill.name} className="group text-foreground/60 text-xs tracking-wide md:tracking-wider uppercase flex items-center gap-2 p-2 rounded-lg hover:bg-border/20 border border-border/0 hover:border-border/50 transition-colors duration-200">
                            <img className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" src={`https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} width={16} height={16} />
                            {skill.name}
                        </div>

                    ))}
                </div>
            </div>
            <div className="flex gap-4 flex-col">
                <h4 className="text-foreground/80 text-xs tracking-wide md:tracking-wider uppercase">
                    Design
                </h4>

                <div className="flex flex-col gap-2">
                    {techStack.design.map(skill => (
                        <div key={skill.name} className="group text-foreground/60 text-xs tracking-wide md:tracking-wider uppercase flex items-center gap-2 p-2 rounded-lg hover:bg-border/20 border border-border/0 hover:border-border/50 transition-colors duration-200">
                            <img className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" src={`https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} width={16} height={16} />
                            {skill.name}
                        </div>

                    ))}
                </div>
            </div>


        </div>
    );
}