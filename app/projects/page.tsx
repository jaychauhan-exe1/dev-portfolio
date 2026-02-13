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
    {
        title: "Manager",
        link: "https://think-file.vercel.app",
        year: "GEN AI",
        description:
            "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
    },
    {
        title: "Study Planner",
        link: "https://think-file.vercel.app",
        year: "GEN AI",
        description:
            "Off the screen, I enjoy slowing things down and paying attention to the details that usually get missed. I like spending time learning new things outside of work, whether that’s exploring how products are built behind the scenes, improving the way I think and communicate, or simply observing how people interact with technology in everyday life. These moments often influence how I approach problems and make decisions when I’m building for others. I value consistency, clarity, and doing things properly rather than rushing for quick wins. Outside of work, I enjoy quiet routines, experimenting with ideas, and occasionally stepping back to reflect on what’s working and what can be improved. This mindset helps me stay grounded, curious, and intentional—both in my work and beyond it.",
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
                <h1 className='text-xl'>All Projects</h1>
                <ExpandableContent items={projects} />
            </div>
        </div>
    )
}
