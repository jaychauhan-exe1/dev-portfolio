import React from 'react'
import ExpandableContent from '@/components/expandableContent'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const projects = [
    {
        title: "Business Reports",
        link: "https://github.com/jaychauhan-exe1/better-reports",
        year: "NEXT JS",
        description:
            "Business Reports is a business analytics dashboard I built to help businesses understand their data in a clear and practical way. It allows users to compare sales in multiple formats, generate invoices, and view performance insights through clean visual reports, making it easier to track growth and spot trends without digging through complex spreadsheets. One of its standout features is an AI assistant that can answer questions about business performance, sales data, and trends in real time, helping users get instant insights without manual analysis. I used local AI model using ollama to keep the business data safe and secure. Building this project strengthened my skills in data visualization, system design, and creating tools that are not only powerful but genuinely useful for real business decisions.",
    },
    {
        title: "Sales Mobility App",
        link: "https://github.com/jaychauhan-exe1/bettermobility",
        year: "EXPO APP",
        description:
            "Sales Mobility App is a field sales management system I built to replace manual, paper-based workflows with a streamlined digital solution. It allows sales representatives to create orders, manage returns, submit field reports, and handle daily sales activities directly from their mobile devices, improving accuracy and saving time for both reps and management. The app also supports real-time invoice generation with portable printer integration, enabling instant billing during client visits. This project strengthened my ability to design systems that solve real-world business problems and demonstrated how thoughtful digital tools can significantly improve operational efficiency.",
    },
    {
        title: "Think File",
        link: "https://think-file.vercel.app",
        year: "GEN AI",
        description:
            "ThinkFile is a Retrieval-Augmented Generation (RAG) system I built to explore and deepen my understanding of generative AI systems. It allows users to upload and interact with their data through AI-powered conversations, supporting formats such as Word, PDF, CSV, XLSX, Markdown, and other text-based files. Instead of manually searching documents, users can ask questions and receive context-aware answers instantly. The system currently runs on Gemini 3 Flash and 2.5 models, and includes structured file and project management along with chat history tracking. This project was intentionally built as a hands-on learning experience to better understand GenAI architecture, document processing pipelines, and real-world implementation patterns. While it’s not intended as a final product, it served as a practical foundation for experimenting with advanced AI workflows and system design.",
    },
    {
        title: "Manager",
        link: "https://think-file.vercel.app",
        year: "GEN AI",
        description:
            "Manager is a project management system I built to explore and improve my understanding of productivity software design and workflow management. It allows users to organize projects, manage tasks, and track progress through a structured and intuitive interface. Instead of juggling multiple tools or scattered notes, users can centralize their work, deadlines, and priorities in one place. The platform includes features such as project creation, task tracking, status management, and organized workflows that help users maintain clarity across ongoing work. It focuses on simplicity and efficiency, enabling individuals or teams to plan, monitor, and execute projects more effectively. This project was developed as a hands-on learning experience to better understand application architecture, user-focused interface design, and scalable system development. While it is not intended as a full commercial product, it served as a practical foundation for experimenting with modern web technologies and productivity tool design patterns.",
    },
    {
        title: "Insights Mafia Office Manager",
        link: "https://insights-mafia.vercel.app",
        year: "NEXT JS",
        description:
            "Insights Mafia Office Manager is a comprehensive internal management platform I developed to streamline daily operations, team coordination, and financial tracking within the Insights Mafia organization. The system centralizes multiple office workflows—such as task assignment, attendance monitoring, client management, and payment tracking—into a single unified application, reducing the need for fragmented tools. The platform features role-based access control, ensuring that administrators, employees, and freelancers each have access to the tools relevant to their responsibilities. Administrators can manage users, clients, and tasks while overseeing financial activities such as salaries, freelancer wallet balances, and client payments. Employees can track their attendance, manage assigned tasks, and submit leave requests, while freelancers can complete tasks, submit work for review, and monitor their earnings through a built-in wallet system. This project was designed to solve real operational challenges by improving transparency, organization, and efficiency across the team. Building this system provided hands-on experience with application architecture, role-based systems, workflow automation, and scalable internal tooling—demonstrating how custom software can significantly improve team productivity and operational management.",
    },
]

export default function Projects() {
    return (
        <div className='w-full max-w-2xl mx-auto pb-20'>
            <div className='mt-20 flex flex-col gap-6'>
                <Link className='flex gap-1 items-center' href="/">
                    <ArrowLeftIcon size={12} />
                    <span className='text-sm underline'>Go back</span>
                </Link>
                <h1 className='text-2xl mt-4'>All Projects</h1>
                <ExpandableContent items={projects} />
            </div>
        </div>
    )
}